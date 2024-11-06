import { ScrollView, StyleSheet, View } from "react-native";
import { Habit } from "@/components/habits/Habit";
import { emojis } from "@/assets/Emoji";
export default function TabTwoScreen() {
	return (
		<View className="flex-1 h-full">
			<ScrollView className="bg-neutral-100 pt-16 px-4">
				<View className="gap-4">
					<Habit title="Workout" emoji={emojis.ManLiftingWeights} />
					<Habit title="Reading" emoji={emojis.ClosedBook} />
					<Habit title="10 minute writing" emoji={emojis.WritingHand} />
					<Habit title="Meditating" emoji={emojis.WomaninLotusPosition} />
					<Habit title="Stretching" emoji={emojis.PersonCartwheeling} />
					<Habit title="Playing volleyball" emoji={emojis.Volleyball} />
				</View>
			</ScrollView>
		</View>
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
