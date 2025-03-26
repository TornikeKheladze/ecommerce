import { View, ScrollView } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FavouritesStackParamList } from "../../../../navigation/AuthStacks/FavouritesStack";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ProductList from "../../../../components/ProductList/ProductList";
import Txt from "../../../../components/Txt/Txt";

type FavouritesScreenProps = NativeStackScreenProps<
  FavouritesStackParamList,
  "FavouritesList"
>;

const FavouritesScreen: React.FC<FavouritesScreenProps> = () => {
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const { usersWithFav } = useSelector((store: RootState) => store.favourites);
  const favouriteProducts =
    usersWithFav.find((item) => item.userEmail === authorizedUser?.email)
      ?.favProducts || [];

  return (
    <View className="bg-mainBg flex-1">
      <View className="bg-customBlack h-32 justify-end pb-3 items-center">
        <Txt className="text-white text-3xl">Favourites</Txt>
      </View>
      {favouriteProducts.length === 0 ? (
        <Txt className="w-full text-center text-xl mt-10 text-gray-500">
          No Favourite Products Yet
        </Txt>
      ) : (
        <ScrollView className="flex-1">
          <ProductList products={favouriteProducts} />
        </ScrollView>
      )}
    </View>
  );
};

export default FavouritesScreen;
