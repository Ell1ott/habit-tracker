import os
import json
from apng import APNG

import re

importFileString = "export const emojis = {"

png_data = {}  # Dictionary to store results
def analyze_animal_pngs(directory="Animals", output_file="durations.json"):
    """Analyze PNG files and save name/duration pairs to JSON"""
    global importFileString
    
    
    for file in os.listdir(directory):
        if file.lower().endswith('.png'):
            full_path = os.path.join(directory, file)
            emojiName = cleanEmojiName(file)
            try:
                im = APNG.open(full_path)
                frames = len(im.frames)
                duration = frames * 42
                # print(f"{file}: {'Animated' if frames > 1 else 'Static'} ({frames} frames) ({duration} ms)")
                png_data[file] = duration  # Store in dictionary
                s = "'" + emojiName + "': {image: require('@/" + full_path.replace("../../", "").replace("\\", "/") + "'), duration: " + str(duration) + "},"
                print(s)
                importFileString += s
            except Exception as e:
                print(f"Error processing {file}: {str(e)}")
            # print(full_path)
    
    if not png_data:
        print("No PNG files found in directory")
    else:
        # print(f"\nTotal PNG files analyzed: {len(png_data)}")
        
        # Save to JSON file
        try:
            with open(output_file, 'w') as f:
                json.dump(png_data, f, indent=2)
            # print(f"Duration data saved to {output_file}")
        except Exception as e:
            print(f"Error saving JSON file: {str(e)}")
            
def cleanEmojiName(name):
    return re.sub(r'%[a-zA-Z]*\d+', '', name.replace(".png", "").replace("-", "").replace("(", "").replace(")", ""))
    

if __name__ == "__main__":
    base_dir = "../../assets/Emojis"
    for folder in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder)
        if os.path.isdir(folder_path):
            # print(f"\nAnalyzing folder: {folder}")
            analyze_animal_pngs(directory=folder_path)
            
    importFileString += "}"
    with open("../../assets/Emoji.ts", 'w') as f:
        f.write(importFileString)
    print("Done")