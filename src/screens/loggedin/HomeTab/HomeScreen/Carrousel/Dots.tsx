import {
  Animated,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type DotProps = {
  data: any[];
  scrollX: Animated.Value;
  slideRef: React.MutableRefObject<null>;
};

const Dots: React.FC<DotProps> = ({ data, scrollX, slideRef }) => {
  const { width } = useWindowDimensions();

  const scrollTo = (index: number) => {
    if (slideRef.current) {
      (slideRef.current as FlatList<any>).scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  return (
    <View className="flex-row bg-white h-16 items-center justify-center">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <TouchableOpacity key={i.toString()} onPress={() => scrollTo(i)}>
            <Animated.View
              style={{ width: dotWidth, height: 10, opacity }}
              className="rounded-full bg-[#493d8a] mx-2"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Dots;
