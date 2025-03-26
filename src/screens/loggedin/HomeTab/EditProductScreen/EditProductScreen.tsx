import { View, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import Txt from "../../../../components/Txt/Txt";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProductForm from "../../../../components/ProductForm/ProductForm";

type EditProductScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "EditProduct"
>;

const EditProductScreen: React.FC<EditProductScreenProps> = ({
  navigation,
  route,
}) => {
  const { canGoBack, goBack } = navigation;
  const productId = route.params.productId;

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
        <Txt className="text-white text-3xl">Edit Product</Txt>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EditProductImages", {
            productId: route.params.productId,
          })
        }
        className="flex-row items-center  mt-3 gap-2 rounded-xl bg-customBlack p-2"
      >
        <Txt className="text-xl text-white">Edit Images</Txt>
        <MaterialCommunityIcons
          name="image-edit-outline"
          size={20}
          color="white"
        />
      </TouchableOpacity>
      <ProductForm productId={productId} />
    </View>
  );
};

export default EditProductScreen;
