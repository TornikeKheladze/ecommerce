import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SortConfig } from "../ProductListScreen";

type SortBtnProps = {
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  sortConfig: SortConfig;
  setValues: SortConfig;
};

const SortBtn: React.FC<SortBtnProps> = ({
  setSortConfig,
  sortConfig,
  setValues,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        setSortConfig({
          by: setValues.by,
          direction: setValues.direction,
        })
      }
      className={`rounded-xl ${
        sortConfig.by === setValues.by &&
        sortConfig.direction === setValues.direction
          ? "bg-customBlack"
          : "bg-gray-400"
      }  py-1 px-4 flex-row items-center gap-2`}
    >
      <Text className="text-white">{setValues.direction.toUpperCase()}</Text>
      <AntDesign
        name={setValues.direction === "asc" ? "caretup" : "caretdown"}
        size={15}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default SortBtn;
