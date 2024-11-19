import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import { Image, type ImageSource } from "expo-image";

export default function ImageUploader() {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect;

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({      
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
      setImage(undefined)
    }
  };

  return (
    <Pressable onPress={pickImageAsync} className="w-11/12">
      <View className="mt-4 flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300/25 py-10 max-h-[400px]">
        {image && (
          <View className="mx-auto min-w-20 w-full h-full p-5">
            <Image
              source={{ uri: image }}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                resizeMode: "stretch",
              }}
              className=" rounded-lg w-full h-full"
            />
          </View>
        )}
        {!image && (
          <View className="mx-auto">
            <Ionicons name="image" color={"#d1d5db"} size={96} />
          </View>
        )}

        <View className="mt-4 flex">
          <Text className="font-semibold text-indigo-400 text-center text-2xl">
            Upload a File
          </Text>
          <Text className="font-semibold text-gray-300 text-center">
            JPG or GIF
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
