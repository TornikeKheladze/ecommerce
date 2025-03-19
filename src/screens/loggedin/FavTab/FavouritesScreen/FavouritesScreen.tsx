import { View, Text, ScrollView } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FavouritesStackParamList } from "../../../../navigation/AuthStacks/FavouritesStack";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ProductList from "../../../../components/ProductList/ProductList";

type FavouritesScreenProps = NativeStackScreenProps<
  FavouritesStackParamList,
  "FavouritesList"
>;

const FavouritesScreen: React.FC<FavouritesScreenProps> = () => {
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const { usersWithFav } = useSelector((store: RootState) => store.favourites);
  const favouriteProducts = usersWithFav.find(
    (item) => item.userEmail === authorizedUser?.email
  )?.favProducts;

  return (
    <View className="bg-mainBg flex-1">
      <View className="bg-customBlack h-32 justify-end pb-3 items-center">
        <Text className="text-white text-3xl">Favourites</Text>
      </View>
      {!favouriteProducts ? (
        <Text className="w-full text-center text-xl mt-10 text-gray-500">
          No Favourite Products Yet
        </Text>
      ) : (
        <ScrollView className=" pt-4 flex-1">
          <ProductList products={favouriteProducts} />
        </ScrollView>
      )}
    </View>
  );
};

export default FavouritesScreen;
