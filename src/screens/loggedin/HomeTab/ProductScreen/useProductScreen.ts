import { Animated } from "react-native";
import { useRef } from "react";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { saveFavourites } from "../../../../store/favouritesSlice";
import { saveCartProducts } from "../../../../store/cartSlice";
import { RouteProp } from "@react-navigation/native";

export const useProductScreen = (
  route: RouteProp<HomeStackParamList, "Product">
) => {
  const product = route.params.product;

  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const dispatch = useDispatch<AppDispatch>();
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const { usersWithFav } = useSelector((store: RootState) => store.favourites);
  const { userWithCart } = useSelector((store: RootState) => store.cart);

  const favouriteProducts = usersWithFav.find(
    (item) => item.userEmail === authorizedUser?.email
  )?.favProducts;
  const cartProducts = userWithCart.find(
    (item) => item.userEmail === authorizedUser?.email
  )?.cartProducts;

  const onFavouritePress = () => {
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

  const onAddCartPress = () => {
    dispatch(
      saveCartProducts({
        products: cartProducts ? [...cartProducts, product] : [product],
        userEmail: authorizedUser?.email as string,
      })
    );
  };

  const currentProductInCart = cartProducts?.filter((p) => p.id === product.id);

  return {
    currentProductInCart,
    onAddCartPress,
    onFavouritePress,
    favouriteProducts,
    scrollX,
    slideRef,
    viewConfig,
    product,
  };
};
