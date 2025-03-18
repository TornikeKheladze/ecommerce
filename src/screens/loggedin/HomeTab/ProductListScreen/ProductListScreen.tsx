import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ProductList from "../../../../components/ProductList/ProductList";
import { BackIcon, FilterIcon } from "../../../../assets/icons";

type ProductListScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "ProductList"
>;

const ProductListScreen: React.FC<ProductListScreenProps> = ({
  route,
  navigation,
}) => {
  const { canGoBack, goBack } = navigation;

  const backPress = () => {
    if (!canGoBack()) {
      return;
    }
    goBack();
  };

  const { products, categories } = useSelector(
    (store: RootState) => store.products
  );

  const [activeCategories, setActiveCategories] = useState(
    route.params.category ? [route.params.category] : categories
  );

  const productsToRender = products.filter((item) => {
    return activeCategories.includes(item.category);
  });

  return (
    <View className="pb-36">
      <View className="bg-customBlack h-32 pb-3 flex-row items-end justify-between px-4">
        <TouchableOpacity
          onPress={backPress}
          className="rounded-lg bg-mainBg p-2 items-center justify-center"
        >
          <BackIcon color="#0d0c22" size={20} />
        </TouchableOpacity>
        <Text className="text-white text-3xl">Products</Text>
        <TouchableOpacity className="bg-mainBg p-2 rounded-xl flex-row items-center justify-between">
          <FilterIcon color="#0d0c22" />
        </TouchableOpacity>
      </View>

      <ScrollView className="bg-mainBg pt-4">
        <ProductList products={productsToRender} />
      </ScrollView>
    </View>
  );
};

export default ProductListScreen;
