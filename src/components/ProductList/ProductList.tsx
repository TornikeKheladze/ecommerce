import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Product } from "../../types/common";
import { HeartIcon } from "../../assets/icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/AuthStacks/HomeStack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { saveFavourites } from "../../store/productSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import Txt from "../Txt/Txt";

type ProductListPropTypes = {
  products: Product[];
};

const ProductList: React.FC<ProductListPropTypes> = ({ products }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const { usersWithFav } = useSelector((store: RootState) => store.products);
  const favouriteProducts = usersWithFav.find(
    (item) => item.userEmail === authorizedUser?.email
  )?.favProducts;

  const onFavouritePress = (product: Product) => {
    const updateProducts = favouriteProducts
      ?.map((f) => f.id)
      .includes(product.id)
      ? favouriteProducts.filter((f) => f.id !== product.id)
      : [...(favouriteProducts || []), product];

    dispatch(
      saveFavourites({
        products: updateProducts,
        userEmail: authorizedUser?.email as string,
      })
    );
  };

  const goToProductPage = (product: Product) => {
    navigation.navigate("Product", { product });
  };
  const isHomeTab = route.name === "ProductList" || route.name === "Home";
  return (
    <View className="flex-1 flex-row flex-wrap items-center justify-center gap-5 py-4">
      {products.map((item) => (
        <TouchableOpacity
          onPress={() => goToProductPage(item)}
          key={item.id}
          className="rounded-2xl w-[44%] h-52 bg-white justify-center items-center p-2 relative"
        >
          {isHomeTab && authorizedUser?.isAdmin && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProduct", { productId: item.id })
              }
              className="absolute left-2 top-2 rounded-md p-1 bg-gray-100"
            >
              <AntDesign name="edit" size={23} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => onFavouritePress(item)}
            className={`absolute top-2 right-2 rounded-md p-1 ${
              favouriteProducts?.map((f) => f.id).includes(item.id)
                ? "bg-yellow-300"
                : "bg-gray-100"
            }`}
          >
            <HeartIcon color="black" />
          </TouchableOpacity>
          <Image
            style={{
              flex: 1,
              resizeMode: "contain",
              height: 70,
              width: 70,
            }}
            source={{ uri: item.images[0] }}
          />
          <Txt className="text-sm text-center">
            {item.title.length > 40
              ? `${item.title.slice(0, 40)}...`
              : item.title}
          </Txt>
          <View className="flex-row justify-between w-full mt-4">
            <Txt className="text-sm">{item.price.toString()}$</Txt>
            <Txt className="text-sm">{item.rating.rate.toString()}/5</Txt>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductList;
