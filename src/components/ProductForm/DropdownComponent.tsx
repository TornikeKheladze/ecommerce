import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { UseFormSetValue } from "react-hook-form";
import { ProductForm } from "./useProductForm";

type ItemType = { label: string; value: string };

type DropdownComponentProps = {
  value: string;
  categories: ItemType[];
  setValue: UseFormSetValue<ProductForm>;
};

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  value,
  categories,
  setValue,
}) => {
  const renderItem = (item: ItemType) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={categories}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select Category"
      value={value}
      onChange={(item) => {
        setValue("category", item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: 35,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
