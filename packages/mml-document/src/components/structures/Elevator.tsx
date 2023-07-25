import React, { useCallback, useEffect, useRef, useState } from "react";

import BasicRoom from "./BasicRoom";
import { GroupProps } from "../../types";
import { CustomElement } from "../../types/declaration";
import SimpleSwitch from "../utilis/SimpleSwitch";

type ElevatorProps = GroupProps & {
  levels: number;
  height?: number;
  externalWidth?: number;
  externalDepth?: number;
};

export default function Elevator(props: ElevatorProps) {
  const {
    levels,
    height = 4,
    externalDepth = 3,
    externalWidth = 2,
    ...rest
  } = props;

  const currentFloor = useRef(0);
  const yPos = useRef(0);
  const [isMoving, setIsMoving] = useState(false);
  const platformRef = useRef<CustomElement<any>>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout>>();

  const goUp = useCallback(() => {
    if (isMoving) {
      clearTimeout(intervalRef.current);
      return;
    }

    setIsMoving(true);
    currentFloor.current =
      currentFloor.current < props.levels - 1 ? currentFloor.current + 1 : 0;
  }, [currentFloor, intervalRef, isMoving, props.levels]);

  const moveElevatorTimeout = useCallback(
    () =>
      setTimeout(() => {
        if (!platformRef.current) return;

        const newY = currentFloor.current * height;

        if (yPos.current === newY) {
          setIsMoving(false);
          clearTimeout(intervalRef.current);
          return;
        }

        yPos.current =
          yPos.current < newY
            ? Math.min(yPos.current + 0.1, newY)
            : Math.max(yPos.current - 0.1, newY);

        platformRef.current.setAttribute("y", yPos.current.toString());
        intervalRef.current = moveElevatorTimeout();
      }, 16),
    [yPos, height, currentFloor, platformRef, setIsMoving]
  );

  useEffect(() => {
    if (!isMoving) return;

    intervalRef.current = moveElevatorTimeout();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMoving, moveElevatorTimeout]);

  return (
    <m-group {...rest} y={0.01}>
      <BasicRoom
        width={externalWidth}
        depth={externalDepth}
        wallConfig={{
          height: height * levels,
          depth: 0.05,
          south: { invisible: true },
        }}
        hasCeiling
      >
        <m-group y={0} ref={platformRef}>
          <BasicRoom
            width={externalWidth - 0.1}
            depth={externalDepth - 0.1}
            wallConfig={{
              height,
              depth: 0.05,
              south: { invisible: true },
            }}
            hasCeiling
          >
            <SimpleSwitch
              x={externalWidth / 2 - 0.08}
              y={1}
              ry={-90}
              onClick={goUp}
            />
          </BasicRoom>
        </m-group>
      </BasicRoom>
    </m-group>
  );
}
