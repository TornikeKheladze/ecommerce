import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Txt from "../../../../components/Txt/Txt";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";
import AntDesign from "@expo/vector-icons/AntDesign";

type EditUserScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "EditUser"
>;

const EditUserScreen: React.FC<EditUserScreenProps> = ({ navigation }) => {
  const { goBack, canGoBack } = navigation;
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
    </View>
  );
};

export default EditUserScreen;
