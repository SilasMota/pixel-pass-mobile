import { View, Text, ScrollView, Image as RNImage } from "react-native";
import ImageUploader from "../components/ImageUploader";
import SecretInput from "../components/SecretInput";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { UserContext } from "../_layout";
import { FormField } from ".";
import { Canvas, Image, Skia, SkImage } from "@shopify/react-native-skia";
import { AES } from "crypto-js";
import { fromByteArray } from "base64-js";

export default function EncodeScreen() {
  const [imageBase64, setImageBase64] = useState(null);
  const [imageBase642, setImageBase642] = useState<string | null>(null);
  const [image, setImage] = useState<SkImage>();
  const { passKey } = useContext(UserContext);
  const [formLayout, setFormLayout] = useState<FormField[]>([
    {
      label: "User",
      value: "teste",
    },
    {
      label: "Password",
      value: "teste",
    },
  ]);

  function handleEncode() {
    if (imageBase64) {
      let skData = Skia.Data.fromBase64(imageBase64);
      let image = Skia.Image.MakeImageFromEncoded(skData);
      const data = image?.readPixels() || [];
      let binaryText = "";

      let text = JSON.stringify(formLayout);
      try {
        text = AES.encrypt(text, passKey).toString();
      } catch (e) {
        console.log(e);
      }

      // console.log("Looping to convert text message to binary text")
      // Looping to convert text message to binary text
      for (let i = 0; i < text.length; i++) {
        let binaryChar = text.charCodeAt(i).toString(2).padStart(8, "0");
        binaryText += binaryChar;
      }

      // Adding null byte to the end of the binary text so we know when to stop
      // binaryText += '00000000'

      // Validating if the image is long enough to encode the message
      if (binaryText.length > data.length / 4) {
        alert("Text is too long to encode in this image.");
        console.log("Text is too long to encode in this image.");
        return;
      }

      // console.log("Loop through image bytes replacing LSB with bites on the binary text")
      // Loop through image bytes replacing LSB with bites on the binary text
      for (let i = 0; i < binaryText.length; i++) {
        data[i * 4] = (data[i * 4] & 0b11111110) | parseInt(binaryText[i]);
      }

      // console.log(data.slice(binaryText.length,data.length))

      // let skData2 = Skia.Data.fromBytes(data.slice(binaryText.length + 1,data.length - 1) as Uint8Array);
      const encoded = fromByteArray(data as Uint8Array);
      // let image2 = Skia.Image.MakeImageFromEncoded(skData2);
      // console.log(encoded);
      if (encoded) 
        setImageBase642("data:image/jpg;base64," + encoded);
      console.log(imageBase642?.slice(0,imageBase642.length/3));
      // console.log(image?.encodeToBase64)
      if (image) {
        setImage(image);
      }
    }
  }

  return (
    <ScrollView className="bg-slate-600">
      <View className="flex-1 py-2 items-center bg-slate-600">
        {/* <SecretInput label="User" />
        <SecretInput label="Password" /> */}
        {formLayout.map((field) => (
          <SecretInput
            key={field.label}
            label={field.label}
            value={field.value}
          />
        ))}
        {/* <Canvas>
          <Image image={image} fit="contain" />
        </Canvas> */}
        {imageBase642 &&
          <RNImage
          source={{ uri: imageBase642 }}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
          className=" rounded-lg w-full h-full"
        />
            
}
        <ImageUploader setImageBase64={setImageBase64} />
        <Button onPress={handleEncode}>
          <Text className="text-gray-300 text-lg py-3 ">Encode</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
