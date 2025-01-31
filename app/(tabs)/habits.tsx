import { ScrollView, StyleSheet, View } from "react-native";
import { Habit } from "@/components/habits/Habit";
import { emojis } from "@/assets/Emoji";
import { TwColors } from "@/assets/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";

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
			title: "Reading",
			emoji: "ClosedBook",
			data: Array(rows * cols)
				.fill(false)
				.map(() => Math.random() < 0.5),
		},
		{
			title: "10 minute writing",
			emoji: "WritingHand",
			color: "Amber",
			data: Array(rows * cols)
				.fill(false)
				.map(() => Math.random() < 0.5),
		},
		{
			title: "Meditating",
			emoji: "WomaninLotusPosition",
			data: Array(rows * cols)
				.fill(false)
				.map(() => Math.random() < 0.5),
		},
		{
			title: "Stretching",
			emoji: "PersonCartwheeling",
			data: Array(rows * cols)
				.fill(false)
				.map(() => Math.random() < 0.5),
		},
		{
			title: "Playing volleyball",
			emoji: "Volleyball",
			data: Array(rows * cols)
				.fill(false)
				.map(() => Math.random() < 0.5),
		},
	];

	useEffect(() => {
		loadHabits();
	}, []);

	const [isLoaded, setIsLoaded] = useState(false);

	const loadHabits = async () => {
		try {
			const savedHabits = await AsyncStorage.getItem("habits");
			if (savedHabits) {
				// setHabits(JSON.parse(savedHabits));
				setHabits(defaultHabits);
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

	const onHabitDataChange = (index: number, newData: boolean[]) => {
		const updatedHabits = [...habits];
		updatedHabits[index].data = newData;
		setHabits(updatedHabits);
		saveHabits(updatedHabits);
	};

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

	return (
		<ScrollView className=" bg-neutral-100 flex">
			<View className="gap-4 flex-1 flex p-4 pt-6 h-full">{habitComps}</View>
		</ScrollView>
	);
}
