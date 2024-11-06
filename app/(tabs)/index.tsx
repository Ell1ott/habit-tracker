import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Habit } from "@/components/habits/Habit";
import { emojis } from "@/assets/Emoji";
import { TwColors } from "@/assets/Colors";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
export default function TabTwoScreen() {
	const [isWriting, setIsWriting] = useState(false);
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
				/>
				{/* <View className="flex-1"></View> */}
				{!isWriting && (
					<Habit title="Playing volleyball" emoji={emojis.Volleyball} />
				)}
			</View>
		</ScrollView>
	);
}
