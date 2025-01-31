import { Pressable, Text, View } from "react-native";
import HabitGrid from "./HabitGrid";
import { ThemedText } from "../ThemedText";
import { Dumbbell } from "lucide-react-native";
import { useState, useEffect, useMemo, useRef, RefObject } from "react";
import { Animated } from "react-native";
import { Image, ImageSource } from "expo-image";
import { Asset } from "expo-asset";
import { emojis } from "@/assets/Emoji";
import { TwColors, TWColor } from "@/assets/Colors";
import { HabitType } from "@/app/(tabs)/habits";

interface HabitProps {
	title: string;
	emoji: Emoji;
	color?: TWColor;
	habitData: HabitType[];
	setHabitData: React.Dispatch<React.SetStateAction<HabitType[]>>;
	index: number;
}

interface SaveHabitData {
	(data: boolean[]): void;
}

export const Habit = ({
	title,
	emoji,
	color = TwColors.Sky,
	habitData,
	setHabitData,
	index,
}: HabitProps) => {
	const [done, setDone] = useState<boolean>(false);

	const handleDoneChange = (newDoneValue: boolean): void => {
		setDone(newDoneValue);
		setHabitData((prev: HabitType[]) => {
			let p = [...prev];
			p[index].data[p[index].data.length - 1] = newDoneValue;
			return p;
		});
	};

	const rows: number = 7;
	const cols: number = 21;

	const weekday = (new Date().getDay() + 6) % 7;

	const knownDays = habitData[index].data.length + (6 - weekday);

	return (
		<View className="bg-white p-2 rounded-md drop-shadow-sm border-black/5 border">
			<Pressable
				className="flex flex-row items-center gap-2 mb-2"
				onPress={() => handleDoneChange(!done)}
			>
				{AnimatedIcon(emoji, done, color)}
				<ThemedText type="subtitle">{title}</ThemedText>
			</Pressable>
			<HabitGrid
				rows={rows}
				data={habitData[index].data}
				color={color}
				extraAfter={6 - weekday}
				extraBefore={Math.max(cols * rows - knownDays, 0)}
			/>
		</View>
	);
};

type Emoji = {
	image: ImageSource;
	duration: number;
};

const AnimatedIcon = (emoji: Emoji, done: boolean, color: TWColor) => {
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
			className="rounded-md aspect-square flex items-center h-14 p-0 justify-center "
			style={{
				transform: [{ scale: scaleValue }],
				opacity: done ? 1 : 0.75,
				backgroundColor: done ? color[3] : color[1],
			}}
		>
			<Image
				style={{ height: 40, width: 40 }}
				source={emoji.image}
				autoplay={false}
				ref={emojiRef}
			/>
		</Animated.View>
	);
};
