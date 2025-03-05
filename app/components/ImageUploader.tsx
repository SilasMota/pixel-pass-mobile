import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export type ImageUploaderProps = {
  setImageBase64: any,
  onUpload?(): any,
  setFormLayout? : any
}

export default function ImageUploader({
  setImageBase64,
  onUpload,
  setFormLayout
}: ImageUploaderProps) {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect;

  const pickImageAsync = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      });
      setImageBase64(base64);
      // console.log("data:image/png;base64,"+base64)
      setImage("data:image/jpg;base64," + base64);
      onUpload && onUpload();
    } else {
      alert("You did not select any image.");
      setImage(undefined);
    }
  };

  return (
    <Pressable
      onPress={() => {
        setFormLayout && setFormLayout([]);
        pickImageAsync()
      }}
      className="w-11/12 flex max-h-[425px] max-w-[400px] p-4"
    >
      <View className="flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300/25 py-10  w-full h-full">
        {image && (
          <View className="mx-auto min-w-20 w-full h-full px-5 py-2">
            <Image
              source={{ uri: image }}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
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

        <View className="mb-2 flex">
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
