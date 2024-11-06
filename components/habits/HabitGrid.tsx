import { TWColor } from "@/assets/Colors";
import React, { useState, useMemo } from "react";
import { View } from "react-native";

const HabitGrid = ({
	data,
	rows,
	color,
}: {
	data: boolean[];
	rows: number;
	color: TWColor;
}) => {
	// Using useState for mutable state
	const size = 10.5;

	return (
		<View className="flex flex-wrap" style={{ height: rows * (size + 4) }}>
			{data.map((isCompleted, i) => (
				<View
					key={i}
					className="m-[2px] rounded-sm"
					style={{
						opacity: isCompleted ? 1 : 0.15,
						backgroundColor: color[5],
						height: size,
						width: size,
					}}
				/>
			))}
		</View>
	);
};

export default HabitGrid;
