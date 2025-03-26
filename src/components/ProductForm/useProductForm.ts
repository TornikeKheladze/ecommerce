import { Alert } from "react-native";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { editProduct, saveProducts } from "../../store/productSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/AuthStacks/HomeStack";

export type ProductForm = {
  title: string;
  price: string;
  description: string;
  category: string;
};

const editProductSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.string().required("Price is required"),
  description: yup.string().required("Description Required"),
  category: yup.string().required("Category Required"),
});

export const useProductForm = (productId: number | undefined) => {
  const { products, categories } = useSelector(
    (store: RootState) => store.products
  );
  const { navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const product = products.find((item) => item.id === productId);
  const dispatch = useDispatch<AppDispatch>();

  const defaultValues = product
    ? {
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        title: product.title,
      }
    : {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductForm>({
    resolver: yupResolver(editProductSchema),
    defaultValues,
  });

  const category = useWatch({
    control,
    name: "category",
  });

  const onSubmit = (data: ProductForm) => {
    if (product) {
      dispatch(
        editProduct({
          ...product,
          ...data,
          price: +data.price,
        })
      );
      Alert.alert("Success", "Product Edited", [
        {
          text: "OK",
        },
      ]);
    } else {
      const newProduct = {
        ...data,
        price: +data.price,
        id: products.length + 1,
        rating: {
          count: 0,
          rate: 0,
        },
        images: [],
      };
      dispatch(saveProducts([...products, newProduct]));
      Alert.alert("Success", "Product Added Now You Can Add Images", [
        {
          text: "Add Images",
          onPress: () =>
            navigate("EditProductImages", { productId: newProduct.id }),
        },
      ]);
    }
  };

  return {
    control,
    errors,
    category,
    setValue,
    categories,
    handleSubmit,
    onSubmit,
  };
};
