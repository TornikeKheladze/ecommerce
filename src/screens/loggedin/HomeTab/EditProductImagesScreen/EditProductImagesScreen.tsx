import { View, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import Txt from "../../../../components/Txt/Txt";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { pickImage, uploadImage } from "../../../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { editProduct } from "../../../../store/productSlice";
import { Product } from "../../../../types/common";
import EvilIcons from "@expo/vector-icons/EvilIcons";

type EditProductImagesScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "EditProductImages"
>;

const EditProductImagesScreen: React.FC<EditProductImagesScreenProps> = ({
  navigation,
  route,
}) => {
  const { canGoBack, goBack } = navigation;
  const productId = route.params.productId;
  const { products } = useSelector((store: RootState) => store.products);
  const product = products.find((item) => item.id === productId) as Product;
  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<string | null>(null);

  const upload = () => {
    if (!image) return;
    uploadImage(image).then((res) => {
      dispatch(
        editProduct({
          ...product,
          images: [...product.images, res as string],
        })
      );
      setImage(null);
    });
  };

  const deleteImage = (imageTodelete: string) => {
    Alert.alert("Delete", "Do You want to delete image?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          dispatch(
            editProduct({
              ...product,
              images: product.images.filter((img) => img !== imageTodelete),
            })
          ),
      },
    ]);
  };
  const isEven =
    (image ? product.images.length + 1 : product.images.length) % 2 === 0
      ? true
      : false;

  return (
    <View className="flex-1 bg-mainBg items-center">
      <View className="bg-customBlack h-32 justify-end pb-3 items-center w-full">
        {canGoBack() && (
          <TouchableOpacity
            onPress={goBack}
            className="absolute left-2 bottom-3"
          >
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
        )}
        <Txt className="text-white text-3xl">Edit Product Images</Txt>
      </View>
      <ScrollView className="flex-1 w-full">
        <View className="flex-1 w-full p-4 items-center justify-start">
          <Txt className="text-2xl mb-6 text-center">{product.title}</Txt>
          <View
            className={`flex-row flex-wrap items-center ${
              isEven ? "justify-center" : "justify-between"
            } gap-5`}
          >
            {product.images.map((image) => (
              <View
                className="bg-white rounded-2xl w-[47%] h-48 p-1 items-center"
                key={Math.random().toString() + image}
              >
                <Image
                  style={{
                    flex: 1,
                    resizeMode: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  source={{ uri: image }}
                />
                <TouchableOpacity
                  onPress={() => deleteImage(image)}
                  className="flex-row mt-3 items-center justify-center gap-1 bg-red-500 w-1/2 p-1 rounded-full"
                >
                  <Txt className="text-white text-sm">Delete</Txt>
                  <EvilIcons name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ))}
            {image && (
              <View className="bg-white rounded-2xl w-[47%] h-48 p-1 mt-5">
                <Image
                  style={{
                    flex: 1,
                    resizeMode: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  source={{ uri: image }}
                />
                <View className="flex-row justify-center gap-4 mt-3">
                  <TouchableOpacity
                    onPress={upload}
                    className="flex-row items-center gap-1 p-1 bg-green-600 rounded-full"
                  >
                    <Txt className="text-white text-xs">Save</Txt>
                    <AntDesign name="save" size={15} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="rounded-full gap-1 bg-red-500 p-1 flex-row items-center"
                    onPress={() => setImage(null)}
                  >
                    <Txt className="text-xs text-white">Cancel</Txt>
                    <AntDesign name="closecircleo" size={15} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => pickImage(setImage)}
            className="flex-row items-center  mt-3 gap-2 rounded-xl bg-customBlack p-2"
          >
            <Txt className="text-xl text-white">Add Image</Txt>
            <MaterialCommunityIcons
              name="file-image-plus-outline"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1"></View>
      </ScrollView>
    </View>
  );
};

export default EditProductImagesScreen;
