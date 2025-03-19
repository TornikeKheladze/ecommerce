import { View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import { Product } from "../../../../types/common";
import { RootState } from "../../../../store/store";
import ProductList from "../../../../components/ProductList/ProductList";
import Txt from "../../../../components/Txt/Txt";

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, "Home">;

const findPopularProducts = (products: Product[], numOfItems: number) => {
  const sorted = products
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, numOfItems);
  return sorted;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { products, categories } = useSelector(
    (store: RootState) => store.products
  );

  const popularProducts = findPopularProducts(products, 6);

  return (
    <View className="pb-36 ">
      <View className="bg-customBlack h-32 justify-end pb-3 items-center">
        <Txt className="text-white text-3xl">Categories</Txt>
      </View>
      <ScrollView className="bg-mainBg mt-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={(item) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductList", { category: item.item })
              }
              className="rounded-2xl mx-2 w-36 h-36 bg-white justify-center items-center"
            >
              <Txt className="text-xl text-center">
                {item.item.toUpperCase()}
              </Txt>
            </TouchableOpacity>
          )}
        />
        <View className="mt-8 mb-2 px-4 flex-row items-center justify-between">
          <Txt className="text-2xl ">Popular Products</Txt>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductList", {})}
          >
            <Txt className="bg-customBlack rounded-lg p-3 text-white">
              View All
            </Txt>
          </TouchableOpacity>
        </View>
        <ProductList products={popularProducts} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
