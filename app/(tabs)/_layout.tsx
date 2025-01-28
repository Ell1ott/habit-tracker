import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	faCompass as faCompassSolid,
	faBookmark as faBookmarkSolid,
	faGear,
	faSearch,
	faHome,
	faFeather,
	faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faCompass, faBookmark } from "@fortawesome/free-regular-svg-icons";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
			}}
			backBehavior="history"
		>
			<Tabs.Screen
				name="habits"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faCalendarCheck} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faHome} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="diary"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faFeather} color={color} />
					),
				}}
			/>

			{/* <Tabs.Screen
				name="saved"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							icon={focused ? faBookmarkSolid : faBookmark}
							color={color}
						/>
					),
				}}
			/> */}
			{/* <Tabs.Screen
				name="settings"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faGear} color={color} />
					),
				}}
			/> */}
		</Tabs>
	);
}
