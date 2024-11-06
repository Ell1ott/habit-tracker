import { Pressable, Text, View } from "react-native";
import HabitGrid from "./HabitGrid";
import { ThemedText } from "../ThemedText";
import { Dumbbell } from "lucide-react-native";
import { useState, useEffect, useMemo, useRef, RefObject } from "react";
import { Animated } from "react-native";
import { Image, ImageSource } from "expo-image";
import { Asset } from "expo-asset";
import { emojis } from "@/assets/Emoji";

export const Habit = ({ title, emoji }: { title: string; emoji: Emoji }) => {
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
				{AnimatedIcon(emoji, done)}
				<ThemedText type="subtitle">{title}</ThemedText>
			</Pressable>
			<HabitGrid rows={rows} data={habitData} />
		</View>
	);
};

type Emoji = {
	image: ImageSource;
	duration: number;
};

const AnimatedIcon = (emoji: Emoji, done: boolean) => {
	const scaleValue = new Animated.Value(1);
	const emojiRef = useRef<Image>(null);

	useEffect(() => {
		if (done) {
			Animated.spring(scaleValue, {
				toValue: 1.2,
				velocity: 0,
				tension: 1,
				friction: 5,
				useNativeDriver: true,
			}).start(() => {
				Animated.spring(scaleValue, {
					toValue: 1,
					tension: 1,
					friction: 2,
					useNativeDriver: true,
				}).start();
			});
			if (emoji.duration <= 42) return;
			emojiRef.current?.startAnimating();
			setTimeout(() => {
				emojiRef.current?.stopAnimating();
				console.log("HI");
			}, emoji.duration);
		}
	}, [done]);
	return (
		<Animated.View
			className={
				"rounded-md aspect-square flex items-center h-14 p-0 justify-center " +
				(done ? "bg-sky-200" : "bg-sky-50")
			}
			style={{
				transform: [{ scale: scaleValue }],
			}}
		>
			{/* <Dumbbell size={26} color="black" /> */}

			<Image
				style={{ height: 40, width: 40 }}
				source={emoji.image}
				autoplay={false}
				ref={emojiRef}
				className="p-0 m-4"
			/>
		</Animated.View>
	);
};
