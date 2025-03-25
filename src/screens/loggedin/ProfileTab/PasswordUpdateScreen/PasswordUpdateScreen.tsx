import { View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Txt from "../../../../components/Txt/Txt";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { changePassword } from "../../../../store/userSlice";

const loginSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Password Required")
    .min(8, "Minimum 8 Letters"),
  newPassword: yup
    .string()
    .required("New Password Required")
    .min(8, "Minimum 8 Letters"),
  passwordConfirmation: yup
    .string()
    .required("Password Confirmation Required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

type PasswordResetForm = {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

type PasswordUpdateScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "PasswordUpdate"
>;

const PasswordUpdateScreen: React.FC<PasswordUpdateScreenProps> = ({
  navigation,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PasswordResetForm>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const { authorizedUser } = useSelector((store: RootState) => store.users);

  const { goBack, canGoBack } = navigation;

  const onSubmit = (data: PasswordResetForm) => {
    if (authorizedUser?.password !== data.oldPassword) {
      Alert.alert("Error", "Incorrect Old Password", [
        {
          text: "Try Again",
        },
      ]);
    } else {
      dispatch(
        changePassword({
          email: authorizedUser?.email as string,
          password: data.newPassword,
        })
      );
      Alert.alert("Success", "Password Changed", [
        {
          text: "Go To Profile",
          onPress: () => navigation.navigate("Profile"),
        },
      ]);
    }
  };

  return (
    <View className="flex-1 bg-mainBg items-center">
      <View className="bg-customBlack h-32 justify-end pb-3 items-center w-full">
        {canGoBack() && (
          <TouchableOpacity
            onPress={goBack}
            className="absolute left-2 bottom-3"
          >
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
        )}
        <Txt className="text-white text-3xl">Password Update</Txt>
      </View>
      <View className="w-full flex-1 px-9 mt-12">
        <Input
          fieldName="oldPassword"
          displayName={"Old Password"}
          control={control}
          error={errors.oldPassword}
        />
        <Input
          fieldName="newPassword"
          displayName={"New Password"}
          control={control}
          error={errors.newPassword}
        />
        <Input
          fieldName="passwordConfirmation"
          displayName={"Confirm Password"}
          control={control}
          error={errors.passwordConfirmation}
        />
        <TouchableOpacity
          className="w-full p-2 rounded-3xl bg-customBlack items-center mt-6"
          onPress={handleSubmit(onSubmit)}
        >
          <Txt className="text-white text-2xl">Confirm</Txt>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordUpdateScreen;
