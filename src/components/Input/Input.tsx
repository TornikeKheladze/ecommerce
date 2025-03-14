import { Control, Controller, FieldError } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { useTranslateAnimation } from "../../hooks/useTranslateAnimation";

type InputProps = {
  fieldName: string;
  error?: FieldError;
  control: Control<any>;
  displayName: string;
  direction?: "x" | "y";
  initialOffset?: number;
};

const Input: React.FC<InputProps> = ({
  fieldName,
  displayName,
  error,
  control,
  direction = "x",
  initialOffset = -400,
}) => {
  const inputAnimatedStyle = useTranslateAnimation(
    direction,
    initialOffset,
    300
  );

  return (
    <Animated.View className="w-full" style={[inputAnimatedStyle]}>
      <Text className="mb-2 text-xl text-customBlack">{displayName}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="bg-white h-10 rounded-xl pl-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={String(value)}
            secureTextEntry={fieldName === "password" ? true : false}
            placeholder={displayName}
          />
        )}
        name={fieldName}
        defaultValue=""
      />
      <Text
        className={`text-red-500 text-sm transition-opacity duration-300 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error?.message}
      </Text>
    </Animated.View>
  );
};

export default Input;
