import { View, Text } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../navigation/AuthStack";

type DashboardScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Dashboard"
>;

const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  return (
    <View>
      <Text>DashboardScreen</Text>
    </View>
  );
};

export default DashboardScreen;
