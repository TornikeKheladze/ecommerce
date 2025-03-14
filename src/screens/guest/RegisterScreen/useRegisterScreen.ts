import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../../../types/common";
import { useTranslateAnimation } from "../../../hooks/useTranslateAnimation";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/userSlice";
import { AppDispatch } from "../../../store/store";
import { Alert } from "react-native";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only Letters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only Letters"),
  email: yup.string().required("Email Required").email("Invalid Email"),
  password: yup
    .string()
    .required("Password Required")
    .min(8, "Minimum 8 Letters"),
  passwordConfirmation: yup
    .string()
    .required("Password Confirmation Required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  isAdmin: yup.boolean().optional(),
});

interface UserRegisterForm extends User {
  passwordConfirmation: string;
}

type Navigation = NativeStackNavigationProp<
  GuestStackParamList,
  "Register",
  undefined
>;

export const useRegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserRegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: { isAdmin: false },
  });
  const navigation = useNavigation<Navigation>();

  const isAdmin = useWatch({
    control,
    name: "isAdmin",
  });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: UserRegisterForm) => {
    dispatch(registerUser(data));
    Alert.alert("Success", "User Registered", [
      {
        text: "Login",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  const submitAnimatedStyle = useTranslateAnimation("y", 400, 300);
  const switchAnimatedStyle = useTranslateAnimation("x", 400, 300);

  return {
    handleSubmit,
    control,
    errors,
    isAdmin,
    onSubmit,
    switchAnimatedStyle,
    submitAnimatedStyle,
    setValue,
  };
};
