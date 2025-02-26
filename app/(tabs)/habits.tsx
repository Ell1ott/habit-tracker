import { ScrollView, StyleSheet, View } from "react-native";
import { Habit } from "@/components/habits/Habit";
import { emojis } from "@/assets/Emoji";
import { TwColors } from "@/assets/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import NewHabitButton from "@/components/habits/NewHabitButton";

export type HabitType = {
	title: string;
	emoji: keyof typeof emojis;
	color?: keyof typeof TwColors;
	data: boolean[];
};
export default function TabTwoScreen() {
	const rows = 7;
	const cols = 21;
	const [habits, setHabits] = useState<HabitType[]>([]);

	const defaultHabits: HabitType[] = [
		{
			title: "Workout",
			emoji: "ManLiftingWeights",
			color: "Red",
			data: Array(rows * cols - 30)
				.fill(false)
				.map(() => Math.random() < 0.5),
		},
		{
			title: "10 minute writing",
			emoji: "WritingHand",
			color: "Amber",
			data: Array(rows * cols)
				.fill(false)
				.map(() => Math.random() < 0.2),
		},
		{
			title: "Meditating",
			emoji: "WomaninLotusPosition",
			data: Array(rows * cols)
				.fill(false)
				.map(() => Math.random() < 0.3),
		},
		{
			title: "Stretching",
			emoji: "PersonCartwheeling",
			data: Array(rows * cols - 10)
				.fill(false)
				.map(() => Math.random() < 0.1),
		},
	];

	useEffect(() => {
		loadHabits();
	}, []);

	const [isLoaded, setIsLoaded] = useState(false);

	const loadHabits = async () => {
		try {
			const metaData = await AsyncStorage.getItem("meta");
			let newDays = 0;
			const day = Math.floor(Date.now() / 86400000);
			if (metaData) {
				console.log("Meta data loaded");
				const parsedMeta = JSON.parse(metaData);
				console.log(day - parsedMeta.day);
				newDays = day - parsedMeta.day;
			}
			await AsyncStorage.setItem(
				"meta",
				JSON.stringify({
					// Day since 1970
					day,
				})
			);

			const savedHabits = await AsyncStorage.getItem("habits");
			if (savedHabits) {
				const parsedHabits = JSON.parse(savedHabits);
				for (let i = 0; i < newDays; i++) {
					parsedHabits.forEach((habit: any) => {
						habit.data.push(false);
					});
				}
				setHabits(parsedHabits);
				saveHabits(parsedHabits);
				// setHabits(defaultHabits);
				console.log("Habits loaded");
			} else {
				setHabits(defaultHabits);
			}
		} catch (error) {
			console.error("Error loading habits:", error);
			setHabits(defaultHabits);
		}
	};

	useEffect(() => {
		if (habits.length > 0) {
			setIsLoaded(true);
			saveHabits(habits);
		}
	}, [habits]);

	const saveHabits = async (updatedHabits: HabitType[]) => {
		try {
			await AsyncStorage.setItem("habits", JSON.stringify(updatedHabits));
		} catch (error) {
			console.error("Error saving habits:", error);
		}
	};

	// const onHabitDataChange = (index: number, newData: boolean[]) => {
	// 	const updatedHabits = [...habits];
	// 	updatedHabits[index].data = newData;
	// 	setHabits(updatedHabits);
	// 	saveHabits(updatedHabits);
	// };

	const habitComps = useMemo(() => {
		return habits.map((habit, i) => (
			<Habit
				key={i}
				index={i}
				title={habit.title}
				emoji={emojis[habit.emoji]}
				color={habit.color && TwColors[habit.color]}
				habitData={habits}
				setHabitData={setHabits}
			/>
		));
	}, [habits]);

	const handleNewHabit = (habit: HabitType) => {
		const updatedHabits = [...habits, habit];
		setHabits(updatedHabits);
		saveHabits(updatedHabits);
	};

	return (
		<ScrollView className=" bg-neutral-100 flex">
			<View className="gap-4 flex-1 flex p-4 pt-6 h-full">
				{habitComps}
				<NewHabitButton onNewHabit={handleNewHabit} />
			</View>
		</ScrollView>
	);
}
