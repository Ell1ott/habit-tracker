import { TwColors } from "@/assets/Colors";
import { TextInput } from "react-native";

export default function DiaryInput({
	content,
	setIsWriting,
	handleContentChange,
}: {
	content: string;
	setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
	handleContentChange: (content: string) => void;
}) {
	return (
		<TextInput
			className="text-xl flex-1"
			placeholder="What happened today?"
			placeholderTextColor={TwColors.Neutral[4]}
			multiline={true}
			onFocus={() => setIsWriting(true)}
			onBlur={() => setIsWriting(false)}
			textAlignVertical="top"
			value={content}
			onChange={(e) => handleContentChange(e.nativeEvent.text)}
			style={{ outline: "none" }}
		/>
	);
}
