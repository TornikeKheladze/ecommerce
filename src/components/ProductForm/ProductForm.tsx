import { View, TouchableOpacity } from "react-native";
import React from "react";
import Input from "../Input/Input";
import Txt from "../Txt/Txt";
import DropdownComponent from "./DropdownComponent";
import { useProductForm } from "./useProductForm";

const ProductForm: React.FC<{ productId?: number }> = ({ productId }) => {
  const {
    control,
    errors,
    category,
    setValue,
    categories,
    handleSubmit,
    onSubmit,
  } = useProductForm(productId);
  return (
    <View className="w-full flex-1 px-9 mt-5">
      <Input
        fieldName="title"
        displayName={"Title"}
        control={control}
        error={errors.title}
        props={{
          multiline: true,
          numberOfLines: 10,
          style: {
            height: 70,
            textAlignVertical: "top",
          },
        }}
      />
      <Input
        fieldName="description"
        displayName={"Description"}
        control={control}
        error={errors.description}
        props={{
          multiline: true,
          numberOfLines: 10,
          style: {
            height: 150,
            textAlignVertical: "top",
          },
        }}
      />
      <Input
        fieldName="price"
        displayName={"Price"}
        control={control}
        error={errors.price}
      />
      <View>
        <Txt className="mb-2 text-xl text-customBlack">Category</Txt>
        <View className="flex-row items-center justify-center">
          <DropdownComponent
            value={category}
            setValue={setValue}
            categories={categories.map((c) => ({ value: c, label: c }))}
          />
        </View>
        <Txt
          className={`text-red-500 text-sm transition-opacity duration-300 ${
            errors.category ? "opacity-100" : "opacity-0"
          }`}
        >
          {errors.category && errors?.category.message}
        </Txt>
      </View>
      <TouchableOpacity
        className="w-full p-2 rounded-3xl bg-customBlack items-center mt-6"
        onPress={handleSubmit(onSubmit)}
      >
        <Txt className="text-white text-2xl">Confirm</Txt>
      </TouchableOpacity>
    </View>
  );
};

export default ProductForm;
