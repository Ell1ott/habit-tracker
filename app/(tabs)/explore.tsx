import { StyleSheet, View } from "react-native";
import { Habit } from "@/components/habits/Habit";
export default function TabTwoScreen() {
	return (
		<View className="bg-neutral-100 flex-1 pt-16 p-4">
			<Habit title="Workout" emoji="🏋️" />
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
