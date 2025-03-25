import { Control, Controller, FieldError } from "react-hook-form";
import { TextInput, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { useTranslateAnimation } from "../../hooks/useTranslateAnimation";
import Txt from "../Txt/Txt";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

type InputProps = {
  fieldName: string;
  error?: FieldError;
  control: Control<any>;
  displayName: string;
  direction?: "x" | "y";
  initialOffset?: number;
  animate?: boolean;
};

const Input: React.FC<InputProps> = ({
  fieldName,
  displayName,
  error,
  control,
  direction = "x",
  initialOffset = -400,
  animate = false,
}) => {
  const inputAnimatedStyle = animate
    ? [useTranslateAnimation(direction, initialOffset, 300)]
    : [];
  const [isHidden, setIsHidden] = useState(true);

  const isPasswordInput =
    fieldName.includes("password") || fieldName.includes("Password");

  return (
    <Animated.View className="w-full" style={inputAnimatedStyle}>
      <Txt className="mb-2 text-xl text-customBlack">{displayName}</Txt>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="bg-white h-10 rounded-xl pl-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={String(value)}
            secureTextEntry={isPasswordInput ? isHidden : false}
            placeholder={displayName}
          />
        )}
        name={fieldName}
        defaultValue=""
      />
      {isPasswordInput && (
        <TouchableOpacity
          onPress={() => setIsHidden(!isHidden)}
          className="absolute right-3 top-11"
        >
          <Feather
            name={isHidden ? "eye-off" : "eye"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      )}

      <Txt
        className={`text-red-500 text-sm transition-opacity duration-300 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error?.message}
      </Txt>
    </Animated.View>
  );
};

export default Input;
