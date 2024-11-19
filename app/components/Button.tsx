import { PropsWithChildren } from "react";
import { View, Pressable, Text } from "react-native";

export default function Button({children} : PropsWithChildren) {
  return (
    <View className="bg-indigo-500 mt-4 flex-row justify-center rounded-lg w-11/12  text-gray-300">
    <Pressable className="w-full h-full flex-row justify-center" onPress={() => alert("pressed")}> 
      {children}
    </Pressable>
  </View>
  )
}
