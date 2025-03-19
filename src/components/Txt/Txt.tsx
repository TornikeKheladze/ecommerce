import { Text } from "react-native";
import React from "react";

type TxtProps = {
  className?: string;
  children: number | string[] | string | undefined;
  style?: {};
};

const Txt: React.FC<TxtProps> = ({ className = "", children, style = {} }) => {
  return (
    <Text style={style} className={`font-inter ${className}`}>
      {children}
    </Text>
  );
};

export default Txt;
