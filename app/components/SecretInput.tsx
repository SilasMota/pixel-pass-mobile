import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, TextInput, View, Text, TextInputProps, Alert } from "react-native";
import * as Clipboard from 'expo-clipboard';

export type SecretInputProps = TextInputProps & {
  label?: string;
};

export default function SecretInput({ label, ...rest }: SecretInputProps) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const showAlert = () =>
    Alert.alert(
      label + " Copied",
      label + " was copied to clipboard",
      [
        {
          text: 'Ok'
        },
      ],
      {
        cancelable: true,
      }
    );
  return (
    <View className="flex-row justify-around px-4 items-end">
      <View className="mt-5 w-10/12">
        <Text className="text-gray-300 text-lg font-bold">{label}</Text>
        <View className="bg-slate-700 mt-2 flex-row justify-around rounded-lg w-11/12 border border-slate-500 text-gray-300">
          <TextInput
            className=" w-10/12 text-gray-300"
            secureTextEntry={isHidden}
            {...rest}
          />
          {isHidden ? (
            <View className="flex justify-center items-center">
              <Pressable
                onPress={() => setIsHidden(false)}
                className="flex-1 items-center justify-center p-2"
              >
                <Ionicons name="eye" size={24} color={"#d1d5db"} />
              </Pressable>
            </View>
          ) : (
            <View className="flex justify-center items-center">
              <Pressable
                onPress={() => setIsHidden(true)}
                className="flex-1 items-center justify-center p-2"
              >
                <Ionicons name="eye-off" size={24} color={"#d1d5db"} />
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <View className="bg-slate-700 flex-row w-2/12 rounded-lg border border-slate-500 text-gray-300">
        <Pressable
          onPress={async () => {
            await Clipboard.setStringAsync(rest.value? rest.value : "");
            showAlert();
          }}
          className="flex-1 items-center justify-center py-2"
        >
          <Ionicons name="copy" size={24} color={"#d1d5db"} />
        </Pressable>
      </View>
    </View>
  );
}
