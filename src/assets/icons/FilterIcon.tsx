import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { memo } from "react";
const SvgComponent: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <Svg
    //@ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width={20}
    height={20}
  >
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="m35.4 87.12 168.65 196.44A16.07 16.07 0 0 1 208 294v119.32a7.93 7.93 0 0 0 5.39 7.59l80.15 26.67A7.94 7.94 0 0 0 304 440V294a16.07 16.07 0 0 1 4-10.44L476.6 87.12A14 14 0 0 0 466 64H46.05A14 14 0 0 0 35.4 87.12z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
