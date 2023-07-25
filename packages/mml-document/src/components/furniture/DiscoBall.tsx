import React, { useEffect, useRef, useState } from "react";

import { GroupProps } from "../../types";

type DiscoBallProps = GroupProps & {
  radius?: number;
  speed?: number;
  color?: string;
  activeColor?: string;
  isOn?: boolean;
};

export default function DiscoBall(props: DiscoBallProps) {
  const {
    radius = 0.5,
    isOn,
    speed = 0.02,
    color = "silver",
    activeColor = "yellow",
    ...groupProps
  } = props;
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isOn) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setRotation((prevRotation) => prevRotation + speed);
    }, 1000 / 60); // update 60 times per second

    return () => {
      clearInterval(intervalRef.current); // clear interval when component unmounts
    };
  }, [isOn, speed]);

  return (
    <m-group ry={rotation} {...groupProps}>
      <m-sphere color={isOn ? activeColor : color} radius={radius} />
    </m-group>
  );
}
