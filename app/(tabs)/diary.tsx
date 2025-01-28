import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Habit } from "@/components/habits/Habit";
import { emojis } from "@/assets/Emoji";
import { TwColors } from "@/assets/Colors";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { QuickDaySelection } from "@/components/diary/QuickDaySelection";
import useCurrentDiaryContent from "@/stores/currentDiaryContent";
export default function TabTwoScreen() {
	const [isWriting, setIsWriting] = useState(false);
	const currentDiaryContent = useCurrentDiaryContent();
	function handleContentChange(content: string) {
		currentDiaryContent.setContent(content);
	}
	return (
		<ScrollView
			className=" bg-neutral-100 flex"
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<View className="gap-4 flex-1 flex pt-[60px] p-6 h-full">
				<ThemedText type="title">
					{new Date().toLocaleDateString("en-US", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</ThemedText>
				<TextInput
					className="text-xl flex-1"
					placeholder="What happened today?"
					placeholderTextColor={TwColors.Neutral[400]}
					multiline={true}
					onFocus={() => setIsWriting(true)}
					onBlur={() => setIsWriting(false)}
					textAlignVertical="top"
					value={currentDiaryContent.content}
					onChange={(e) => handleContentChange(e.nativeEvent.text)}
				/>
			</View>
			<QuickDaySelection />
		</ScrollView>
	);
}
