import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found!" }} />
      <View className="flex-1 bg-slate-700 justify-center items-center">
        <Link href="../" className=" text-xl underline text-gray-300">
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}
