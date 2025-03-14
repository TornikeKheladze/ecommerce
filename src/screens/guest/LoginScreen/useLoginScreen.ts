import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useTranslateAnimation } from "../../../hooks/useTranslateAnimation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { saveAuthUser } from "../../../store/userSlice";
import { User } from "../../../types/common";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email Required").email("Invalid Email"),
  password: yup.string().required("Password Required"),
});

type UserLoginForm = {
  email: string;
  password: string;
};

export const useLoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserLoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const { users } = useSelector((store: RootState) => store.users);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: UserLoginForm) => {
    const userToLogin = users.find(
      (user) => data.email === user.email && data.password === user.password
    );
    if (userToLogin) {
      dispatch(saveAuthUser(data as User));
    } else {
      setError("password", {
        message: "Email or password is not correct",
      });
    }
  };

  const submitAnimatedStyle = useTranslateAnimation("y", 400, 300);

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    submitAnimatedStyle,
  };
};
