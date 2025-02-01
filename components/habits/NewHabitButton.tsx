import { TwColors } from "@/assets/Colors";
import {
	Alert,
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";

export default function NewHabitButton() {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<Modal
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<Pressable
						className="justify-center h-full bg-black/10"
						onPress={() => setModalVisible(false)}
					>
						<Pressable className="bg-white justify-center m-4 p-4 rounded-md gap-1">
							<View className="justify-between mb-4 flex-row">
								<Text className="text-2xl font-semibold">New Modal</Text>
								<Pressable onPress={() => setModalVisible(false)}>
									<FontAwesomeIcon icon={faMultiply}></FontAwesomeIcon>
								</Pressable>
							</View>
							<Text className="font-medium">Name</Text>
							<TextInput
								className="rounded-md border-black/10 border px-3"
								placeholder="eg. Reading, Workout"
							></TextInput>
						</Pressable>
					</Pressable>
				</Modal>
				<Pressable
					className="bg-white p-2 rounded-md drop-shadow-sm border-black/5 border flex flex-row items-center gap-2 mb-2"
					onPress={() => {
						setModalVisible(true);
					}}
					android_ripple={{ color: TwColors.Neutral[2] }}
				>
					<FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
					<ThemedText className="text-lg font-bold">New habit</ThemedText>
				</Pressable>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
