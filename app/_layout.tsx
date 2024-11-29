import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { View, Image, Text } from "react-native";
import SecretInput from "./components/SecretInput";
import Button from "./components/Button";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface UserContextData {
  passKey: string;
  setPassKey(passKey:string): any;
}
export const UserContext = createContext<UserContextData>({} as UserContextData);

export default function RootLayout() {

  const [passKey, setPassKey] = useState("");
  const [passKeyValue, setPassKeyValue] = useState<string>("");

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{ passKey, setPassKey }}>
        <StatusBar style="dark" />
        {passKey ? (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        ) : (
          <View className=" flex-1 bg-slate-600 justify-center items-center">
            <Image
              source={require("@/assets/images/stegosaurus-white.png")}
              className="w-32 h-32"
            />
            <SecretInput
              label="Change your Secret Key"
              onChange={(e) => setPassKeyValue(e.nativeEvent.text)}
            />
            <Button onPress={() => setPassKey(passKeyValue)}>
              <Text className="text-gray-300 text-lg py-3 ">Set Secret Key</Text>
            </Button>
          </View>
        )}
      </UserContext.Provider>
    </SafeAreaProvider>
  );
}
