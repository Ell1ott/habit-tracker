import React, { useState, useMemo } from "react";
import { View } from "react-native";

const HabitGrid = ({ data, rows }: { data: boolean[]; rows: number }) => {
	// Using useState for mutable state

	return (
		<View className="flex flex-wrap" style={{ height: rows * (11 + 4) }}>
			{data.map((isCompleted, i) => (
				<View
					key={i}
					className={`w-[11px] h-[11px] m-[2px] rounded-sm ${
						isCompleted ? "bg-sky-500" : "bg-sky-100"
					}`}
				/>
			))}
		</View>
	);
};

export default HabitGrid;
