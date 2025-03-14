import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

type TranslateDirection = "x" | "y";

export const useTranslateAnimation = (
  direction: TranslateDirection = "x",
  initialOffset: number = -200,
  delay: number = 200
) => {
  const translate = useSharedValue(initialOffset);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translate.value = withDelay(
      delay,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.exp) })
    );

    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
  }, [translate, opacity, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform:
      direction === "x"
        ? [{ translateX: translate.value }]
        : [{ translateY: translate.value }],
    opacity: opacity.value,
  }));

  return animatedStyle;
};
