import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ImageUploader from "@/app/components/ImageUploader";
import { Link } from "expo-router";
import { Text, View, TextInput } from "react-native";
import SecretInput from "../components/SecretInput";

export default function Index() {
  const [image, setImage] = useState(null);
  return (
    <View className="flex-1 py-5 items-center bg-slate-600">
      <ImageUploader />
      <SecretInput label="User"/>
      <SecretInput label="Password"/>
    </View>
  );
}
