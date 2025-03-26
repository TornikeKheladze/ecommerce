import { View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Txt from "../../../../../components/Txt/Txt";
import { pickImage, uploadImage } from "../../../../../helpers/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { editUser } from "../../../../../store/userSlice";
import { User } from "../../../../../types/common";

const ProfileImagePicker = () => {
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string | null>(null);

  const imageSrc = image || authorizedUser?.image;

  const upload = () => {
    if (!image) return;
    uploadImage(image).then((res) => {
      dispatch(
        editUser({
          ...authorizedUser,
          image: res,
        } as User)
      );
      setImage(null);
    });
  };

  return (
    <View className="w-24 h-24 items-center justify-center bg-gray-300 rounded-full my-10 self-center">
      {imageSrc ? (
        <Image
          source={{ uri: imageSrc }}
          style={{
            flex: 1,
            resizeMode: "contain",
            height: "100%",
            width: "100%",
            borderRadius: "100%",
          }}
        />
      ) : (
        <AntDesign name="user" size={60} color="black" />
      )}
      {!image ? (
        <TouchableOpacity
          onPress={() => pickImage(setImage)}
          className="flex-row items-center gap-2 absolute -bottom-6"
        >
          <Txt className="text-xs">Edit User Image</Txt>
          <AntDesign name="edit" size={15} color="black" />
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center gap-2 absolute -bottom-8 p-1 rounded-lg">
          <TouchableOpacity
            onPress={upload}
            className="flex-row items-center gap-1 p-1 bg-green-600 rounded-full"
          >
            <AntDesign name="save" size={15} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full gap-1 bg-red-500 p-1"
            onPress={() => setImage(null)}
          >
            <AntDesign name="closecircleo" size={15} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileImagePicker;
