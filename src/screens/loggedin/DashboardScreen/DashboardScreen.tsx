import { View, Text, Button } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../navigation/AuthStack";

type DashboardScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Dashboard"
>;

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Button title="back" onPress={() => navigation.goBack()} />
      <Text>DashboardScreen</Text>
    </View>
  );
};

export default DashboardScreen;
