import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";
import Txt from "../../../../components/Txt/Txt";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Product } from "../../../../types/common";

type PurchaseHistoryScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "PurchaseHistory"
>;

const PurchaseHistoryScreen: React.FC<PurchaseHistoryScreenProps> = ({
  navigation,
}) => {
  const { canGoBack, goBack } = navigation;
  const { userPurchases } = useSelector((store: RootState) => store.purchase);
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const purchases = userPurchases
    .filter((item) => item.userEmail === authorizedUser?.email)
    .reverse();

  const getGroupedItems = (products: Product[]) => {
    const groupedItems = Object.values(
      products.reduce<Record<number, Product[]>>((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = [];
        }
        acc[item.id].push(item);
        return acc;
      }, {})
    );
    return groupedItems;
  };

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
        <Txt className="text-white text-3xl">Purchase History</Txt>
      </View>
      {purchases.length === 0 ? (
        <Txt className="w-full text-center text-xl mt-10 text-gray-500">
          History Is Empty
        </Txt>
      ) : (
        <ScrollView className="flex-1 w-full px-4">
          {purchases.map((item) => (
            <View
              key={item.time}
              className="bg-white w-full mt-8 rounded-2xl p-2 gap-1"
            >
              <View className="flex-row">
                <Txt>Time: </Txt>
                <Txt className="font-interMedium">{item.time}</Txt>
              </View>
              <View className="flex-row">
                <Txt>Total Price: </Txt>
                <Txt className="font-interMedium">{item.price + "$"}</Txt>
              </View>

              {getGroupedItems(item.products).map((products) => (
                <View
                  key={products[0].id + item.time}
                  className="mt-5 flex-row justify-between items-center gap-3 border p-2 rounded-2xl border-gray-300"
                >
                  <View className="w-3/5 gap-2">
                    <Txt className="font-interMedium">{products[0].title}</Txt>
                    <View className="flex-row">
                      <Txt>Quantity: </Txt>
                      <Txt className="font-interMedium">
                        {products.length.toString()}
                      </Txt>
                    </View>
                    <View className="flex-row">
                      <Txt>Price: </Txt>
                      <Txt className="font-interMedium">
                        {products[0].price.toString() + "$"}
                      </Txt>
                    </View>
                  </View>
                  <Image
                    style={{
                      flex: 1,
                      resizeMode: "contain",
                      height: 70,
                      width: 70,
                    }}
                    source={{ uri: products[0].image }}
                  />
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PurchaseHistoryScreen;
