import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { Product } from "../../../../types/common";
import { saveCartProducts } from "../../../../store/cartSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CartStackParamList } from "../../../../navigation/AuthStacks/CartStack";
import { savePurchases } from "../../../../store/purchaseSlice";

export const useCartScreen = (
  navigation: NativeStackNavigationProp<CartStackParamList, "Cart">
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const { userWithCart } = useSelector((store: RootState) => store.cart);
  const cartProducts =
    userWithCart.find((item) => item.userEmail === authorizedUser?.email)
      ?.cartProducts || [];

  const groupedItems = Object.values(
    cartProducts.reduce<Record<number, Product[]>>((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = [];
      }
      acc[item.id].push(item);
      return acc;
    }, {})
  );

  const onAddProductPress = (product: Product) => {
    dispatch(
      saveCartProducts({
        products: cartProducts ? [...cartProducts, product] : [product],
        userEmail: authorizedUser?.email as string,
      })
    );
  };

  const onRemoveProductPress = (product: Product) => {
    const updatedProducts = cartProducts.filter((p) => p.id !== product.id);
    dispatch(
      saveCartProducts({
        products: updatedProducts,
        userEmail: authorizedUser?.email as string,
      })
    );
  };

  const onMinusProductPress = (product: Product) => {
    const updatedProducts = [...cartProducts];
    const index = cartProducts.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      updatedProducts.splice(index, 1);
    }
    dispatch(
      saveCartProducts({
        products: updatedProducts,
        userEmail: authorizedUser?.email as string,
      })
    );
  };

  const goToProductPage = (product: Product) => {
    navigation.navigate("Product", { product });
  };

  const sumPrice = cartProducts
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const onPurchaseSubmit = () => {
    dispatch(
      savePurchases({
        products: cartProducts,
        time: new Date().toString(),
        userEmail: authorizedUser?.email as string,
        price: sumPrice,
      })
    );
    Alert.alert("Success", "Products Purchased", [
      {
        text: "Go To Home Page",
        onPress: () => navigation.getParent()?.navigate("HomeStack"),
      },
    ]);
    setTimeout(() => {
      dispatch(
        saveCartProducts({
          userEmail: authorizedUser?.email as string,
          products: [],
        })
      );
    }, 2000);
  };

  const onPurchasePress = () => {
    Alert.alert("Purchase", "Do You want to buy items?", [
      {
        text: "Cancel",
      },
      {
        text: "Submit",
        onPress: onPurchaseSubmit,
      },
    ]);
  };

  return {
    onPurchasePress,
    goToProductPage,
    sumPrice,
    onMinusProductPress,
    onRemoveProductPress,
    onAddProductPress,
    groupedItems,
  };
};
