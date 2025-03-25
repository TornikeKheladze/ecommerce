import { Button, Image, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";
import Txt from "../../../../components/Txt/Txt";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { logout } from "../../../../store/userSlice";

type ProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "Profile"
>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorizedUser } = useSelector((store: RootState) => store.users);

  return (
    <View className="flex-1 bg-mainBg items-center">
      <View className="bg-customBlack h-32 justify-end pb-3 items-center w-full">
        <Txt className="text-white text-3xl">Profile</Txt>
      </View>
      <View className="w-24 h-24 items-center justify-center bg-gray-300 rounded-full my-8 self-center">
        <AntDesign name="user" size={60} color="black" />
      </View>
      <View className="bg-white p-2 gap-1 my-3 w-2/3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <AntDesign name="user" size={20} color="black" />
          <Txt className="text-gray-400">First Name</Txt>
        </View>
        <Txt className="ml-[27px]">{authorizedUser?.firstName}</Txt>
      </View>
      <View className="bg-white p-2 gap-1 my-3 w-2/3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <AntDesign name="user" size={20} color="black" />
          <Txt className="text-gray-400">Last Name</Txt>
        </View>
        <Txt className="ml-[27px]">{authorizedUser?.lastName}</Txt>
      </View>
      <View className="bg-white p-2 gap-1 my-3 w-2/3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <Fontisto name="email" size={20} color="black" />
          <Txt className="text-gray-400">Email</Txt>
        </View>
        <Txt className="ml-[27px]">{authorizedUser?.email}</Txt>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("PurchaseHistory")}
        className="bg-white p-4 my-3 w-2/3 rounded-2xl py-5 flex-row justify-between"
      >
        <View className="flex-row items-center gap-3">
          <Octicons name="history" size={20} color="black" />
          <Txt>Purchase History</Txt>
        </View>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        className="bg-white p-4 my-3 w-2/3 rounded-2xl py-5 flex-row justify-between"
      >
        <View className="flex-row items-center gap-3">
          <Ionicons name="settings-outline" size={22} color="black" />
          <Txt>Settings</Txt>
        </View>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
      <View className="flex-1 justify-end pb-4">
        <TouchableOpacity
          className="flex-row items-center bg-white p-3 rounded-2xl gap-2"
          onPress={() => dispatch(logout())}
        >
          <SimpleLineIcons name="logout" size={20} color="red" />
          <Txt>Logout</Txt>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

// const [image, setImage] = useState<string | null>(null);
//  const [file, setFile] = useState<any>();
//  const pickImage = async () => {
//    // No permissions request is necessary for launching the image library
//    let result = await ImagePicker.launchImageLibraryAsync({
//      mediaTypes: ["images", "videos"],
//      allowsEditing: true,
//      aspect: [4, 3],
//      quality: 1,
//      base64: true,
//    });

//    console.log(result);

//    if (!result.canceled) {
//      setFile(result.assets[0].base64);
//      setImage(result.assets[0].uri);
//    }
//  };

// <Button title="pick image" onPress={pickImage} />;
// {
//   image && <Image source={{ uri: image }} className="h-20 w-20" />;
// }
