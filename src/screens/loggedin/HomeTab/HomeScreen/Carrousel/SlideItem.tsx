import { View, useWindowDimensions, Image } from "react-native";
import React from "react";

const SlideItem = ({ uri }: { uri: string }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width, height: width }} className="bg-white h-36 flex-1 p-4">
      <Image
        style={{
          flex: 1,
          resizeMode: "contain",
        }}
        source={{ uri }}
      />
    </View>
  );
};

export default SlideItem;
