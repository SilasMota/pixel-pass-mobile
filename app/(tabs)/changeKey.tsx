import { View, Text, Image } from "react-native";
import SecretInput from "../components/SecretInput";
import Button from "../components/Button";
import { createContext, useContext, useState } from "react";
import { UserContext } from "../_layout";
export default function ChangeKeyScreen() {
  const [passKeyValue, setPassKeyValue] = useState<string>("");
  const { passKey, setPassKey } = useContext(UserContext);
  return (
    <View className=" flex-1 bg-slate-600 justify-center items-center">
      <Image
        source={require("@/assets/images/stegosaurus-white.png")}
        className="w-32 h-32"
      />
      <SecretInput
        label="Change your Secret Key"
        value={passKeyValue}
        onChange={(e) => setPassKeyValue(e.nativeEvent.text)}
      />
      <Button
        onPress={() => {
          setPassKey(passKeyValue);
        }}
      >
        <Text className="text-gray-300 text-lg py-3 ">Change Key</Text>
      </Button>
    </View>
  );
}
