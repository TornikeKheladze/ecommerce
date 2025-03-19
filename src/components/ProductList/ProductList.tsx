import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Product } from "../../types/common";
import { HeartIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/AuthStacks/HomeStack";

type ProductListPropTypes = {
  products: Product[];
};

const ProductList: React.FC<ProductListPropTypes> = ({ products }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const goToProductPage = (product: Product) => {
    navigation.navigate("Product", { product });
  };

  return (
    <View className="flex-1 flex-row flex-wrap items-center justify-center gap-5">
      {products.map((item) => (
        <TouchableOpacity
          onPress={() => goToProductPage(item)}
          key={item.id}
          className="rounded-2xl w-[44%] h-52 bg-white justify-center items-center p-2 relative"
        >
          <TouchableOpacity className="absolute top-2 right-2 bg-gray-100 rounded-md p-1">
            <HeartIcon color="black" />
          </TouchableOpacity>
          <Image
            style={{
              flex: 1,
              resizeMode: "contain",
              height: 70,
              width: 70,
            }}
            source={{ uri: item.image }}
          />
          <Text className="text-sm text-center">
            {item.title.length > 40
              ? `${item.title.slice(0, 40)}...`
              : item.title}
          </Text>
          <View className="flex-row justify-between w-full mt-4">
            <Text className="text-sm">{item.price}$</Text>
            <Text className="text-sm">{item.rating.rate}/5</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductList;
