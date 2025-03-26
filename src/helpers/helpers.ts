import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Alert } from "react-native";
import React from "react";

export const pickImage = async (
  setImage: (value: React.SetStateAction<string | null>) => void
) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Required", "Camera roll access is needed!");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images", "videos"],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

export const uploadImage = async (image: string) => {
  interface ImageAsset {
    uri: string;
    name: string;
    type: string;
  }
  if (!image) {
    return;
  }
  try {
    const formData = new FormData();
    const imageAsset: ImageAsset = {
      uri: image,
      name: "upload.jpg",
      type: "image/jpeg",
    };
    formData.append("image", imageAsset as any);

    const uploadResponse = await axios.post<{ filename: string }>(
      "http://localhost:3000/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    Alert.alert("Success", "Upload successful!");
    return `http://localhost:3000/images/${uploadResponse.data.filename}`;
  } catch (error) {
    console.error("Upload error:", error);
    Alert.alert("Error", "Upload failed");
  }
};
