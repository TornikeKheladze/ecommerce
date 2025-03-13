import { Control, Controller, FieldError } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { User } from "../../types/common";

type InputProps = {
  fieldName: keyof User;
  error?: FieldError;
  control: Control<User>;
  displayName: string;
};

const Input: React.FC<InputProps> = ({
  fieldName,
  displayName,
  error,
  control,
}) => {
  return (
    <View className="w-full">
      <Text className="mb-2 text-xl text-customBlack">{displayName}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="bg-white h-10 rounded-xl pl-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
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
    </View>
  );
};

export default Input;
