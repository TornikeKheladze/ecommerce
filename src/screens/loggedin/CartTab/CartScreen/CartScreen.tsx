import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import Txt from "../../../../components/Txt/Txt";
import Feather from "@expo/vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CartStackParamList } from "../../../../navigation/AuthStacks/CartStack";
import { useCartScreen } from "./useCartScreen";

type CartScreenProps = NativeStackScreenProps<CartStackParamList, "Cart">;

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const {
    onPurchasePress,
    goToProductPage,
    sumPrice,
    onMinusProductPress,
    onRemoveProductPress,
    onAddProductPress,
    groupedItems,
  } = useCartScreen(navigation);

  return (
    <View className="bg-mainBg flex-1">
      <View className="bg-customBlack h-32 justify-end pb-3 items-center">
        <Txt className="text-white text-3xl">Cart</Txt>
      </View>
      {groupedItems.length === 0 ? (
        <Txt className="w-full text-center text-xl mt-10 text-gray-500">
          Cart Is Empty
        </Txt>
      ) : (
        <ScrollView className="p-4">
          {groupedItems.map((item) => (
            <TouchableOpacity
              key={item[0].id}
              onPress={() => goToProductPage(item[0])}
              className="w-full rounded-lg bg-white flex-row p-2 mb-3 gap-3"
            >
              <Image
                style={{
                  flex: 1,
                  resizeMode: "contain",
                  height: 120,
                  borderRadius: 12,
                }}
                source={{ uri: item[0].images[0] }}
              />
              <View className="flex-1 justify-between">
                <Txt>
                  {item[0].title.length > 40
                    ? `${item[0].title.slice(0, 40)}...`
                    : item[0].title}
                </Txt>
                <Txt className="text-sm">{item[0].price + "$"}</Txt>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <TouchableOpacity
                      onPress={() => onMinusProductPress(item[0])}
                      className="bg-black rounded-lg w-7 justify-center items-center"
                    >
                      <Txt className="text-white text-2xl">-</Txt>
                    </TouchableOpacity>
                    <Txt>{item.length}</Txt>
                    <TouchableOpacity
                      onPress={() => onAddProductPress(item[0])}
                      className="bg-black rounded-lg w-7 justify-center items-center"
                    >
                      <Txt className="text-white text-2xl">+</Txt>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => onRemoveProductPress(item[0])}
                  >
                    <Feather name="trash-2" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {groupedItems.length !== 0 && (
        <TouchableOpacity
          onPress={onPurchasePress}
          className="py-2 px-4 rounded-xl bg-customBlack items-center flex-row gap-2 mt-4 mx-7 mb-2"
        >
          <Txt className="text-white text-xl flex-1 text-center">
            {`Purchase  (${sumPrice}$)`}
          </Txt>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartScreen;
