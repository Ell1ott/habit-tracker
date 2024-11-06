import { ScrollView, StyleSheet, View } from "react-native";
import { Habit } from "@/components/habits/Habit";
import { emojis } from "@/assets/Emoji";
import { colors } from "@/assets/Colors";
export default function TabTwoScreen() {
	return (
		<ScrollView className=" bg-neutral-100">
			<View className="gap-4 flex-1 pt-16 p-4">
				<Habit
					title="Workout"
					emoji={emojis.ManLiftingWeights}
					color={colors.Red}
				/>
				<Habit title="Reading" emoji={emojis.ClosedBook} />
				<Habit
					title="10 minute writing"
					emoji={emojis.WritingHand}
					color={colors.Amber}
				/>
				<Habit title="Meditating" emoji={emojis.WomaninLotusPosition} />
				<Habit title="Stretching" emoji={emojis.PersonCartwheeling} />
				<Habit title="Playing volleyball" emoji={emojis.Volleyball} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});
