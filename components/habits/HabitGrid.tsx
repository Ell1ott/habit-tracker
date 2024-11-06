import React, { useState, useMemo } from "react";
import { View } from "react-native";

const HabitGrid = ({
	data,
	rows,
	color,
}: {
	data: boolean[];
	rows: number;
	color: string;
}) => {
	// Using useState for mutable state

	return (
		<View className="flex flex-wrap" style={{ height: rows * (11 + 4) }}>
			{data.map((isCompleted, i) => (
				<View
					key={i}
					className="w-[11px] h-[11px] m-[2px] rounded-sm"
					style={{ opacity: isCompleted ? 1 : 0.15, backgroundColor: color }}
				/>
			))}
		</View>
	);
};

export default HabitGrid;
