

import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

types = ["Activities", "Animals", "Food", "Hand%20gestures", "Objects", "People%20with%20activities", "People%20with%20professions", "People", "Smilies", "Symbols", "Travel%20and%20places"]
from time import sleep
import json
def download_emojis():
    # Create Animals directory if it doesn't exist
    for category in types:
        
        if not os.path.exists(category.replace("%20", "-")):
            os.makedirs(category.replace("%20", "-"))

        # GitHub repository URL
        url = 'https://github.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/tree/master/Emojis/' + category
        
        # Get raw content URL base
        raw_base = 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/' + category + '/'

        # Fetch the page
        response = requests.get(url)
        
        print(f"Fetching {url}...")
        print(response)
        png_files = []
        for i in range(5):
            soup = BeautifulSoup(response.text, 'html.parser')

            
            script_tag = soup.find('script', {'type': 'application/json', 'data-target': "react-app.embeddedData"})
            print(script_tag.string)
            if script_tag and script_tag.string:
                data = json.loads(script_tag.string)
                png_files = [item['name'] for item in data['payload']['tree']['items'] if item['name'].endswith('.png')]
                
            print(png_files)

            # Find all links ending with .png
            # png_files = [link.get('href').split('/')[-1] 
            #             for link in soup.find_all('a') 
            #             if link.get('href', '').endswith('.png')]
            

            print(f"Found {len(png_files)} PNG files")
            
            if(len(png_files) != 0):
                break
            sleep(1)

        # Download each PNG
        for png in png_files:
            file_url = urljoin(raw_base, png)
            save_path = os.path.join(category.replace("%20","-"), png.replace(" ", "-"))
            if(os.path.exists(save_path)):
                continue
            print(f"Downloading {png}...")
            response = requests.get(file_url)
            
            if response.status_code == 200:
                with open(save_path, 'wb') as f:
                    f.write(response.content)
            else:
                print(f"Failed to download {png}")

if __name__ == '__main__':
    download_emojis()