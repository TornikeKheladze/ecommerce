import { Button, Image, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";
import Txt from "../../../../components/Txt/Txt";
import * as ImagePicker from "expo-image-picker";

type ProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "Profile"
>;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<any>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setFile(result.assets[0].base64);
      setImage(result.assets[0].uri);
    }
  };

  console.log(file);

  return (
    <View className="flex-1 bg-mainBg pt-28">
      <Txt>ProfileScreen</Txt>
      <Button title="pick image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} className="h-20 w-20" />}
    </View>
  );
};

export default ProfileScreen;
