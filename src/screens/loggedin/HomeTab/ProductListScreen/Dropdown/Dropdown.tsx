import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import Txt from "../../../../../components/Txt/Txt";

type ItemType = { label: string; value: string };

type DropdownProps = {
  data: ItemType[];
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
};

const Dropdown: React.FC<DropdownProps> = ({ data, values, setValues }) => {
  const renderItem = (item: ItemType) => {
    const selected = values.includes(item.value);
    return (
      <View
        className={`p-2 rounded-2xl mb-2 ${
          selected ? "bg-gray-400" : "bg-gray-100"
        }`}
      >
        <Txt style={styles.selectedTextStyle}>{item.label}</Txt>
      </View>
    );
  };

  return (
    <View style={styles.container} className="w-full">
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={{
          padding: 4,
          borderRadius: 8,
        }}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select Category"
        value={values}
        onChange={(item) => setValues(item)}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Txt style={styles.textSelectedStyle}>{item.label}</Txt>
              <AntDesign color="black" name="delete" size={15} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: { padding: 8 },
  dropdown: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },

  icon: {
    marginRight: 5,
  },

  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 7,
    paddingVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 12,
  },
});
