import { TWColor } from "@/assets/Colors";
import React, { useState, useMemo } from "react";
import { View } from "react-native";

const HabitGrid = ({
	data,
	rows,
	color,
	extraBefore = 0,
	extraAfter = 0,
}: {
	data: boolean[];
	rows: number;
	color: TWColor;
	extraBefore?: number;
	extraAfter?: number;
}) => {
	// Using useState for mutable state
	const size = 10.5;

	return (
		<View className="flex flex-wrap" style={{ height: rows * (size + 4) }}>
			{[...Array(extraBefore)].map((_, i) => (
				<Cell key={i} opacity={0.05} i={i} size={size} color={color} />
			))}
			{data.map((isCompleted, i) => (
				<Cell
					key={i}
					opacity={isCompleted ? 1 : 0.15}
					i={i}
					size={size}
					color={color}
				/>
			))}
			{[...Array(extraAfter)].map((_, i) => (
				<Cell key={i} opacity={0.05} i={i} size={size} color={color} />
			))}
		</View>
	);
};

const Cell = ({
	opacity,
	i,
	size,
	color,
}: {
	opacity: number;
	i: number;
	size: number;
	color: TWColor;
}) => (
	<View
		key={i}
		className="m-[2px] rounded-sm"
		style={{
			opacity,
			backgroundColor: color[5],
			height: size,
			width: size,
		}}
	/>
);

export default HabitGrid;
