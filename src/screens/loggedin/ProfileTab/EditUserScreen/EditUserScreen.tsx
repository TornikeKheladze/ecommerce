import { View, TouchableOpacity, Switch, Alert } from "react-native";
import React from "react";
import Txt from "../../../../components/Txt/Txt";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import Input from "../../../../components/Input/Input";
import { User } from "../../../../types/common";
import { editUser } from "../../../../store/userSlice";

type EditUserScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "EditUser"
>;

const editUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only Letters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only Letters"),
  email: yup.string().required("Email Required").email("Invalid Email"),
  isAdmin: yup.boolean().optional(),
});

type EditUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin?: boolean;
};

const EditUserScreen: React.FC<EditUserScreenProps> = ({ navigation }) => {
  const { goBack, canGoBack } = navigation;
  const dispatch = useDispatch<AppDispatch>();
  const { authorizedUser } = useSelector((store: RootState) => store.users);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditUserForm>({
    resolver: yupResolver(editUserSchema),
    defaultValues: authorizedUser,
  });

  const isAdmin = useWatch({
    control,
    name: "isAdmin",
  });

  const onSubmit = (data: EditUserForm) => {
    const isEmailChanging = data.email !== authorizedUser?.email;
    const updatedUserData = isEmailChanging
      ? {
          ...data,
          previousEmail: authorizedUser?.email,
        }
      : data;
    dispatch(editUser(updatedUserData as User));
    Alert.alert("Success", "User Edited", [
      {
        text: "Go To Profile",
        onPress: () => navigation.navigate("Profile"),
      },
    ]);
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
        <Txt className="text-white text-3xl">Edit User</Txt>
      </View>
      <View className="w-full flex-1 px-9 mt-12">
        <Input
          fieldName="firstName"
          displayName={"First Name"}
          control={control}
          error={errors.firstName}
        />
        <Input
          fieldName="lastName"
          displayName={"Last Name"}
          control={control}
          error={errors.lastName}
        />
        <Input
          fieldName="email"
          displayName={"Email"}
          control={control}
          error={errors.email}
        />
        <View className="flex-row items-center justify-center mb-2 gap-4 self-start">
          <Txt className="text-xl text-customBlack">Admin</Txt>
          <Switch
            value={isAdmin}
            onValueChange={() => setValue("isAdmin", !isAdmin)}
          />
        </View>
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

export default EditUserScreen;
