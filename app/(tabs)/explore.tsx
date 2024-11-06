import { ScrollView, StyleSheet, View } from "react-native";
import { Habit } from "@/components/habits/Habit";
import { emojis } from "@/assets/Emoji";
import { TwColors } from "@/assets/Colors";
export default function TabTwoScreen() {
	return (
		<ScrollView className=" bg-neutral-100 flex">
			<View className="gap-4 flex-1 flex pt-16 p-4 h-full">
				<Habit
					title="Workout"
					emoji={emojis.ManLiftingWeights}
					color={TwColors.Red}
				/>
				<Habit title="Reading" emoji={emojis.ClosedBook} />
				<Habit
					title="10 minute writing"
					emoji={emojis.WritingHand}
					color={TwColors.Amber}
				/>
				<Habit title="Meditating" emoji={emojis.WomaninLotusPosition} />
				<Habit title="Stretching" emoji={emojis.PersonCartwheeling} />
				<Habit title="Playing volleyball" emoji={emojis.Volleyball} />
			</View>
		</ScrollView>
	);
}
