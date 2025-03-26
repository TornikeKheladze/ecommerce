import { View, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import Txt from "../../../../components/Txt/Txt";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProductForm from "../../../../components/ProductForm/ProductForm";

type AddProductScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "AddProduct"
>;

const AddProductScreen: React.FC<AddProductScreenProps> = ({ navigation }) => {
  const { canGoBack, goBack } = navigation;

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
        <Txt className="text-white text-3xl">Add Product</Txt>
      </View>

      <ProductForm />
    </View>
  );
};

export default AddProductScreen;
