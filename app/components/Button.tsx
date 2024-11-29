import { PropsWithChildren } from "react";
import { View, Pressable, Text, PressableProps } from "react-native";

export type ButtonProps = PressableProps & {
  children : PropsWithChildren,
}

export default function Button({children, ...rest } : ButtonProps) {
  return (
    <View className="bg-indigo-500 mt-4 flex-row justify-center rounded-lg w-11/12  text-gray-300">
    <Pressable className="w-full h-full flex-row justify-center" {...rest}> 
      {children}
    </Pressable>
  </View>
  )
}
