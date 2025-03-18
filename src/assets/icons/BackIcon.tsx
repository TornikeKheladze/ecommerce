import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { memo } from "react";
const SvgComponent: React.FC<{ color?: string; size?: number }> = ({
  color = "currentColor",
  size = 25,
}) => (
  <Svg
    //@ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width={size}
    height={size}
  >
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={35}
      d="M244 400 100 256l144-144M120 256h292"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
