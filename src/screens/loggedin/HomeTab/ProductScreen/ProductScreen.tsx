import { View, Animated, FlatList } from "react-native";
import React, { useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SlideItem from "../HomeScreen/Carrousel/SlideItem";
import Dots from "../HomeScreen/Carrousel/Dots";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import ProductHeader from "./ProductHeader/ProductHeader";
import Txt from "../../../../components/Txt/Txt";

type ProductScreenProps = NativeStackScreenProps<HomeStackParamList, "Product">;

const ProductScreen: React.FC<ProductScreenProps> = ({ route }) => {
  const product = route.params.product;

  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const testdata = [product.image, product.image, product.image];

  return (
    <View>
      <ProductHeader />
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
      <Txt>{route.params.product.title}</Txt>
    </View>
  );
};

export default ProductScreen;
