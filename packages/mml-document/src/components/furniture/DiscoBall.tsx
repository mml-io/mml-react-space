import React, { useEffect, useRef, useState } from "react";

import { GroupProps } from "../../types";
import { hslToHex } from "../utils/hslToHex";

type DiscoBallProps = GroupProps & {
  radius?: number;
  color?: string;
  isOn?: boolean;
};

export default function DiscoBall(props: DiscoBallProps) {
  const { radius = 0.5, isOn, color = "silver", ...groupProps } = props;
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const [activeColor, setActiveColor] = useState("white");

  useEffect(() => {
    if (!isOn) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveColor(
        hslToHex((((Date.now() + 2000) % 4000) / 4000) * 360, 1, 0.5)
      );
    }, 100);

    return () => {
      clearInterval(intervalRef.current); // clear interval when component unmounts
    };
  }, [isOn]);

  return (
    <m-group {...groupProps}>
      <m-sphere color={isOn ? activeColor : color} radius={radius} />
    </m-group>
  );
}
