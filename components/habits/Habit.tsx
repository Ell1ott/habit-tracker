import { Pressable, View } from "react-native";
import HabitGrid from "./HabitGrid";
import { ThemedText } from "../ThemedText";
import { Dumbbell } from "lucide-react-native";
import { useState, useEffect, useMemo } from "react";
import { Animated } from "react-native";

export const Habit = () => {
	const [done, setDone] = useState(false);

	const handleDoneChange = (newDoneValue: boolean) => {
		setDone(newDoneValue);
		setHabitData((prev) => {
			let p = [...prev];
			p[p.length - 1] = newDoneValue;
			return p;
		});
	};

	const rows = 7;
	const cols = 21;

	const [habitData, setHabitData] = useState(() =>
		Array(rows * cols)
			.fill(false)
			.map(() => Math.random() < 0.5)
	);

	return (
		<View className="bg-white p-2 rounded-md drop-shadow-sm border-black/5 border">
			<Pressable
				className="flex flex-row items-center gap-2 mb-2"
				onPress={() => handleDoneChange(!done)}
			>
				{useMemo(() => AnimatedIcon(done), [done])}
				<ThemedText type="subtitle">Workout</ThemedText>
			</Pressable>
			<HabitGrid rows={rows} data={habitData} />
		</View>
	);
};

const AnimatedIcon = (done: boolean) => {
	const scaleValue = new Animated.Value(1);
	useEffect(() => {
		if (done) {
			Animated.spring(scaleValue, {
				toValue: 1,
				velocity: 2,
				tension: 20,
				friction: 3,
				useNativeDriver: true,
			}).start();
		}
	}, [done]);
	return (
		<Animated.View
			className={"p-2 rounded-md " + (done ? "bg-sky-200" : "bg-sky-50")}
			style={{
				transform: [{ scale: scaleValue }],
			}}
		>
			<Dumbbell size={26} color="black" />
		</Animated.View>
	);
};
