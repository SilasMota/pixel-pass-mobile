import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Button, Pressable, TextInput, View, Text } from "react-native";

export type SecretInputProps = {
  label?:string
}


export default function SecretInput({label} : SecretInputProps) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <View className="mt-5 ">
    <Text className="text-gray-300 text-lg font-bold">{label}</Text>
    <View className="bg-slate-700 mt-2 flex-row justify-around rounded-lg w-11/12 border border-slate-500 text-gray-300">
      <TextInput
        className=" w-10/12 text-gray-300"
        secureTextEntry={isHidden}
      />
      {isHidden ? (
        <View className="flex justify-center items-center">
          <Pressable onPress={() => setIsHidden(false)} className="flex-1 items-center justify-center p-2">
            <Ionicons name="eye" size={24} color={"#d1d5db"}/>
          </Pressable>
        </View>
      ) : (
        <View className="flex justify-center items-center">
          <Pressable onPress={() => setIsHidden(true)} className="flex-1 items-center justify-center p-2">
            <Ionicons name="eye-off" size={24} color={"#d1d5db"}/>
          </Pressable>
        </View>
      )}
    </View>
    </View>
  );
}
