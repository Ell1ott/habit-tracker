import { TwColors } from "@/assets/Colors";
import { Pressable, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function NewHabitButton() {
	return (
		<Pressable
			className="bg-white p-2 rounded-md drop-shadow-sm border-black/5 border flex flex-row items-center gap-2 mb-2"
			onPress={() => {}}
			android_ripple={{ color: TwColors.Neutral[2] }}
		>
			<FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
			<ThemedText type="defaultSemiBold">New habit</ThemedText>
		</Pressable>
	);
}
