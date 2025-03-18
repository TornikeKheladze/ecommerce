import { View, Text } from "react-native";
import React from "react";

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View className="bg-customBlack h-32 justify-end pb-3 items-center">
      <Text className="text-white text-3xl">{title}</Text>
    </View>
  );
};

export default Header;
