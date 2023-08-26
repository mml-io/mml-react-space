import React, { useEffect, useState } from "react";

import { GroupProps } from "../../types";

type SlidingDoorsProps = GroupProps & {
  width: number;
  height: number;
  open: boolean;
  color?: string;
  duration?: number;
};

export default function SlidingDoors(props: SlidingDoorsProps) {
  const { duration = 1000, color, height, width, open } = props;
  const [startTime, setStartTime] = useState(0);
  const [isOpen, setIsOpen] = useState(props.open);

  useEffect(() => {
    const shouldBeOpen = open;
    if (shouldBeOpen !== isOpen) {
      setIsOpen(shouldBeOpen);
      const t = document.timeline.currentTime as number;
      if (startTime > t - duration) {
        setStartTime(t - (duration - (t - startTime)));
      } else {
        setStartTime(t);
      }
    }
  }, [open, isOpen, startTime, duration]);

  const openX = width / 4 + width / 2 - 0.01;
  const closeX = width / 4;

  return (
    <m-group id="sliding-doors" {...props}>
      <m-cube
        id="left-door"
        width={width / 2}
        height={height}
        depth={0.1}
        color={color || "white"}
      >
        <m-attr-anim
          attr="x"
          duration={duration}
          start-time={startTime}
          easing="easeInOutQuad"
          loop={false}
          start={(-(isOpen ? closeX : openX)).toString(10)}
          end={(-(isOpen ? openX : closeX)).toString(10)}
        />
      </m-cube>
      <m-cube
        id="right-door"
        width={width / 2}
        height={height}
        depth={0.1}
        color={color || "white"}
      >
        <m-attr-anim
          attr="x"
          duration={duration}
          start-time={startTime}
          easing="easeInOutQuad"
          loop={false}
          start={(isOpen ? closeX : openX).toString(10)}
          end={(isOpen ? openX : closeX).toString(10)}
        />
      </m-cube>
    </m-group>
  );
}
