import {
  View,
  Animated,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SlideItem from "../HomeScreen/Carrousel/SlideItem";
import Dots from "../HomeScreen/Carrousel/Dots";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import ProductHeader from "./ProductHeader/ProductHeader";
import Txt from "../../../../components/Txt/Txt";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useProductScreen } from "./useProductScreen";

type ProductScreenProps = NativeStackScreenProps<HomeStackParamList, "Product">;

const ProductScreen: React.FC<ProductScreenProps> = ({ route }) => {
  const {
    currentProductInCart,
    onAddCartPress,
    onFavouritePress,
    favouriteProducts,
    testdata,
    scrollX,
    slideRef,
    viewConfig,
    product,
  } = useProductScreen(route);

  return (
    <View className="pb-16 items-center">
      <ProductHeader
        iconClassName={
          favouriteProducts?.map(({ id }) => id).includes(product.id)
            ? "bg-yellow-300"
            : "bg-gray-100"
        }
        onFavouritePress={onFavouritePress}
      />
      <ScrollView>
        <View className="bg-white pt-16">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={testdata}
            keyExtractor={(item) => Math.random().toString()}
            // keyExtractor={(item) => String(item.id)}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
            ref={slideRef}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            renderItem={(item) => <SlideItem uri={item.item} />}
          />
          <Dots data={testdata} scrollX={scrollX} slideRef={slideRef} />
        </View>

        <View className="p-4 flex-row justify-between">
          <Txt className="w-52 text-xl">{product.title}</Txt>
          <Txt className="text-xl">{product.price + "$"}</Txt>
        </View>
        <View className="p-4">
          <Txt>Description</Txt>
          <Txt>{product.description}</Txt>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={onAddCartPress}
        className="py-2 px-4 rounded-xl bg-customBlack items-center flex-row gap-2 mt-4"
      >
        <Txt className="text-white text-xl">Add To Cart</Txt>
        <View className="relative ">
          <AntDesign name="shoppingcart" size={20} color="white" />
          <Txt
            className={`absolute ${
              currentProductInCart?.length === 0 ? "hidden" : ""
            } -top-2 -right-3 rounded-full text-white bg-green-500  text-center w-5 h-5 text-sm justify-center items-center`}
          >
            {currentProductInCart?.length}
          </Txt>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductScreen;
