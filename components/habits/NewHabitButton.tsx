import { TwColors } from "@/assets/Colors";
import { emojis } from "@/assets/Emoji";
import { HabitType } from "@/app/(tabs)/habits";
import {
	Alert,
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	View,
	Image,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";

interface NewHabitButtonProps {
	onNewHabit: (habit: HabitType) => void;
}

export default function NewHabitButton({ onNewHabit }: NewHabitButtonProps) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedColor, setSelectedColor] = useState(TwColors.Blue);
	const [selectedEmoji, setSelectedEmoji] = useState<string>(
		Object.keys(emojis)[0]
	);
	const [habitName, setHabitName] = useState("");

	const colorOptions = [
		TwColors.Red,
		TwColors.Blue,
		TwColors.Green,
		TwColors.Yellow,
		TwColors.Purple,
		TwColors.Pink,
	];

	const handleCreate = () => {
		if (habitName.trim() === "") {
			Alert.alert("Error", "Please enter a habit name");
			return;
		}

		const newHabit: HabitType = {
			title: habitName,
			emoji: selectedEmoji as keyof typeof emojis,
			color: Object.keys(TwColors).find(
				(key) => TwColors[key as keyof typeof TwColors] === selectedColor
			) as keyof typeof TwColors,
			data: [false], // 7 rows * 21 cols
		};

		onNewHabit(newHabit);
		setModalVisible(false);
		setHabitName("");
	};

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
								<Text className="text-2xl font-semibold">Create new Habit</Text>
								<Pressable onPress={() => setModalVisible(false)}>
									<FontAwesomeIcon icon={faMultiply}></FontAwesomeIcon>
								</Pressable>
							</View>
							<Text className="font-medium">Name</Text>
							<TextInput
								className="rounded-md border-black/10 border px-3 mb-4"
								placeholder="eg. Reading, Workout"
								value={habitName}
								onChangeText={setHabitName}
							></TextInput>

							<Text className="font-medium mb-2">Emoji</Text>
							<View className="flex-row gap-2 mb-4 flex-wrap">
								{Object.entries(emojis)
									.slice(0, 30)
									.map(([key, emoji]) => (
										<Pressable
											key={key}
											onPress={() => setSelectedEmoji(key)}
											className={`w-12 h-12 rounded-md items-center justify-center ${
												selectedEmoji === key
													? "border-2 border-black"
													: "border border-black/10"
											}`}
										>
											<Image
												source={emoji.image}
												style={{ width: 32, height: 32 }}
											/>
										</Pressable>
									))}
							</View>

							<Text className="font-medium mb-2">Color</Text>
							<View className="flex-row gap-2">
								{colorOptions.map((color, index) => (
									<Pressable
										key={index}
										onPress={() => setSelectedColor(color)}
										className={`w-8 h-8 rounded-md ${
											selectedColor === color ? "border-2 border-black" : ""
										}`}
										style={{ backgroundColor: color[5] }}
									/>
								))}
							</View>

							<Pressable
								className="bg-blue-300 text-white rounded-md p-3 px-4 mt-4 items-center"
								onPress={handleCreate}
							>
								<Text className="font-semibold text-black text-xl">Create</Text>
							</Pressable>
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
