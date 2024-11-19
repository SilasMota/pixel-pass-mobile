import { View, Text, Pressable } from "react-native";
import ImageUploader from "../components/ImageUploader";
import SecretInput from "../components/SecretInput";
import Button from "../components/Button";

export default function EncodeScreen() {
  return (
    <View className="flex-1 py-2 items-center bg-slate-600">
      <SecretInput label="User" />
      <SecretInput label="Password" />
      <ImageUploader/>
             
        <Button>
          <Text className="text-gray-300 text-lg py-3 ">Encode</Text>
        </Button>
    </View>
  );
}
