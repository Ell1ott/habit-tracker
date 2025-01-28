import { ScrollView, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { DayButton } from "./DayButton";

export const QuickDaySelection = () => {
	const today = new Date();
	const days = Array(10)
		.fill(null)
		.map((_, i) => {
			const date = new Date(today);
			date.setDate(today.getDate() - (9 - i));
			return {
				date: date.getDate(),
				weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
			};
		});

	return (
		<ScrollView
			className="flex-grow-0"
			horizontal
			persistentScrollbar={false}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			contentOffset={{ x: 10000, y: 0 }}
		>
			<View className="flex flex-row p-2">
				{days.map(({ date, weekday }, index) => (
					<DayButton key={index} date={date} weekday={weekday} />
				))}
			</View>
		</ScrollView>
	);
};
