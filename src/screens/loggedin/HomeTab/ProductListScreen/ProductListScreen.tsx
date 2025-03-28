import { View, ScrollView, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../../navigation/AuthStacks/HomeStack";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ProductList from "../../../../components/ProductList/ProductList";
import { BackIcon, FilterIcon } from "../../../../assets/icons";
import Dropdown from "./Dropdown/Dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import SortBtn from "./SortBtn/SortBtn";
import Txt from "../../../../components/Txt/Txt";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type ProductListScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "ProductList"
>;

type SortByKey = "price" | "rating";
type SortDirection = "asc" | "desc";

export type SortConfig = {
  by: SortByKey | undefined;
  direction: SortDirection;
};

const ProductListScreen: React.FC<ProductListScreenProps> = ({
  route,
  navigation,
}) => {
  const { canGoBack, goBack } = navigation;

  const backPress = () => {
    if (!canGoBack()) {
      return;
    }
    goBack();
  };

  const { products, categories } = useSelector(
    (store: RootState) => store.products
  );
  const { authorizedUser } = useSelector((store: RootState) => store.users);

  const [activeCategories, setActiveCategories] = useState(
    route.params.category ? [route.params.category] : []
  );
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    by: undefined,
    direction: "asc",
  });

  const [isOpen, setIsOpen] = useState(false);

  const sortProducts = () => {
    if (!sortConfig.by) return [...products];

    if (sortConfig.by === "price") {
      return [...products].sort((a, b) =>
        sortConfig.direction === "asc" ? a.price - b.price : b.price - a.price
      );
    } else {
      return [...products].sort((a, b) =>
        sortConfig.direction === "asc"
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate
      );
    }
  };

  const productsToRender = sortProducts().filter((item) => {
    if (activeCategories.length === 0) {
      return true;
    }
    return activeCategories.includes(item.category);
  });

  return (
    <View className="flex-1">
      <Modal animationType="fade" transparent={true} visible={isOpen}>
        <TouchableOpacity
          className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"
          onPress={() => setIsOpen(false)}
        />
        <View className="bg-midnightBlue w-4/5 pb-8 top-36 mx-auto rounded-2xl p-2 items-center">
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            className="absolute right-2 top-2"
          >
            <AntDesign name="closecircleo" size={24} color="white" />
          </TouchableOpacity>
          <Txt className="text-white mt-8 text-xl">Filter By Category</Txt>
          <Dropdown
            values={activeCategories}
            setValues={setActiveCategories}
            data={categories.map((c) => ({ label: c, value: c }))}
          />
          <View className="mt-8 items-center w-full ">
            <Txt className="text-white text-xl ">Sort By</Txt>
            <View className="flex-row items-center gap-4 w-full justify-between">
              <Txt className="text-white p-3 rounded-xl">Price:</Txt>
              <SortBtn
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                setValues={{
                  by: "price",
                  direction: "asc",
                }}
              />
              <SortBtn
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                setValues={{
                  by: "price",
                  direction: "desc",
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  setSortConfig({
                    by: undefined,
                    direction: sortConfig.direction,
                  })
                }
              >
                <AntDesign name="closecircleo" size={15} color="white" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-4 w-full justify-between">
              <Txt className="text-white p-3 rounded-xl">Rating:</Txt>
              <SortBtn
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                setValues={{
                  by: "rating",
                  direction: "asc",
                }}
              />
              <SortBtn
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                setValues={{
                  by: "rating",
                  direction: "desc",
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  setSortConfig({
                    by: undefined,
                    direction: sortConfig.direction,
                  })
                }
              >
                <AntDesign name="closecircleo" size={15} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View className="bg-customBlack h-32 pb-3 flex-row items-end justify-between px-4">
        <TouchableOpacity
          onPress={backPress}
          className="rounded-lg bg-mainBg p-2 items-center justify-center"
        >
          <BackIcon color="#0d0c22" size={20} />
        </TouchableOpacity>
        <Txt className="text-white text-3xl">Products</Txt>
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          className="bg-mainBg p-2 rounded-xl flex-row items-center justify-between"
        >
          <FilterIcon color="#0d0c22" />
        </TouchableOpacity>
      </View>

      {authorizedUser?.isAdmin && (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddProduct")}
          className="flex-row items-center  mt-3 gap-2 rounded-xl bg-customBlack p-2 w-1/2 justify-center mx-auto"
        >
          <Txt className="text-xl text-white">Add Product</Txt>
          <MaterialIcons name="post-add" size={24} color="white" />
        </TouchableOpacity>
      )}

      <ScrollView className="bg-mainBg">
        <ProductList products={productsToRender} />
      </ScrollView>
    </View>
  );
};

export default ProductListScreen;
