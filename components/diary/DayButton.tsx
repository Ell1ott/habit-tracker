import { View } from "react-native";
import { ThemedText } from "../ThemedText";

export const DayButton = ({
	date,
	weekday,
}: {
	date: number;
	weekday: string;
}) => {
	return (
		<View className="w-16 h-20 flex items-center justify-center bg-white m-2 border-[0.3px] border-black/40 rounded-md">
			<ThemedText className="text-xl font-bold">{date}</ThemedText>
			<ThemedText>{weekday}</ThemedText>
		</View>
	);
};
