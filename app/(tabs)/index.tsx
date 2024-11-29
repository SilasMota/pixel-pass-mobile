import { useState, useContext } from "react";
import ImageUploader from "@/app/components/ImageUploader";
import { Text, View,ScrollView } from "react-native";
import SecretInput from "../components/SecretInput";
import Button from "../components/Button";
import { Skia } from "@shopify/react-native-skia";
import { UserContext } from "../_layout";
import { AES, enc } from "crypto-js";
export type FormField = {
  label:string
  value:string | undefined
}

export default function Index() {
  const [imageBase64, setImageBase64] = useState(null);
  const { passKey } = useContext(UserContext);
  const [formLayout, setFormLayout] = useState<FormField[]>([]);

  function handleDecode() {
    if (imageBase64) {
      const skData = Skia.Data.fromBase64(imageBase64);
      const image = Skia.Image.MakeImageFromEncoded(skData);
      const data = image?.readPixels() || [];
      let binaryText = "";
      let decodedText = "";

      // Looping through image bytes to get the binary text for the message

      for (let i = 0; i < data.length; i += 4) {
        binaryText += (data[i] & 1).toString();
      }

      // Parsing the binary text to string
      for (let i = 0; i < binaryText.length; i += 8) {
        let byte = binaryText.slice(i, i + 8);
        if (byte.length < 8) break; // Stop if the byte is incomplete
        let charCode = parseInt(byte, 2);
        if (charCode === 0) break; // Stop if we hit a null character
        decodedText += String.fromCharCode(charCode);
      }

      try {
        //Decrypting object with passKey
        decodedText = AES.decrypt(decodedText, passKey).toString(enc.Utf8);
        setFormLayout(JSON.parse(decodedText))
      } catch (error) {
        console.log(error);
        setFormLayout([])
      }
    }
  }

  return (
    <ScrollView className="bg-slate-600">
      <View className="flex-1 py-5 items-center bg-slate-600">
        <ImageUploader setImageBase64={setImageBase64} onUpload={handleDecode}/>
        <Button onPress={handleDecode}>
          <Text className="text-gray-300 text-lg py-3 ">Decode</Text>
        </Button>
        {
          formLayout.map((field) => (
            <SecretInput key={field.label} label={field.label} value={field.value}/>
          ))
        }
      </View>
    </ScrollView>
  );
}
