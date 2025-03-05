import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#d1d5db",
        headerStyle: {
          backgroundColor: "#475569",
        },
        headerTintColor: "#d1d5db",
        tabBarStyle: {
          backgroundColor: "#334155",
          borderBlockColor: "#334155",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Decode",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "lock-open" : "lock-open-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="encode"
        options={{
          href: null,
          title: "Encode",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "lock-closed" : "lock-closed-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="changeKey"
        options={{
          title: "Change Secret Key",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "key" : "key-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
