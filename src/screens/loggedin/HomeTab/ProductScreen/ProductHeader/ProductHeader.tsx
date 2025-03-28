import { TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BackIcon, HeartIcon } from "../../../../../assets/icons";

const ProductHeader: React.FC<{
  iconClassName: string;
  onFavouritePress: () => void;
}> = ({ iconClassName, onFavouritePress }) => {
  const { goBack, canGoBack } = useNavigation();

  return (
    <SafeAreaView
      className={`px-4 z-10 ${
        canGoBack() ? "justify-between" : "justify-end"
      }  flex-row absolute w-full top-0 `}
    >
      {canGoBack() && (
        <TouchableOpacity
          onPress={goBack}
          className="rounded-lg bg-gray-100 w-10 h-10 items-center justify-center"
        >
          <BackIcon color="black" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        className={`rounded-lg w-10 h-10 items-center justify-center ${iconClassName}`}
        onPress={onFavouritePress}
      >
        <HeartIcon color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductHeader;
