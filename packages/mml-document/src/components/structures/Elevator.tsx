import React, { useCallback, useEffect, useState } from "react";

import { GroupProps } from "../../types";
import SimpleSwitch from "../utils/SimpleSwitch";
import SlidingDoors from "../utils/SlidingDoors";
import BasicRoom from "./BasicRoom";

type ElevatorProps = GroupProps & {
  levels: number;
  height?: number;
  externalWidth?: number;
  externalDepth?: number;
};

const doorDuration = 1000;
const floorTime = 2000;
const floorGap = 0.5;

export default function Elevator(props: ElevatorProps) {
  const {
    levels,
    height = 4,
    externalDepth = 3,
    externalWidth = 3,
    ...rest
  } = props;

  const [startTime, setStartTime] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(0);
  const [targetFloor, setTargetFloor] = useState(0);
  const [openAtTarget, setOpenAtTarget] = useState(true);

  const arrivalAtTargetFloorTime =
    startTime + doorDuration + Math.abs(currentFloor - targetFloor) * floorTime;

  const goUp = useCallback(() => {
    if ((document.timeline.currentTime as number) < arrivalAtTargetFloorTime) {
      return;
    }
    if (targetFloor < levels - 1) {
      setStartTime(document.timeline.currentTime as number);
      setCurrentFloor(targetFloor);
      setTargetFloor(targetFloor + 1);
    }
  }, [targetFloor, levels, arrivalAtTargetFloorTime]);

  const goDown = useCallback(() => {
    if ((document.timeline.currentTime as number) < arrivalAtTargetFloorTime) {
      return;
    }
    if (targetFloor !== 0) {
      setStartTime(document.timeline.currentTime as number);
      setCurrentFloor(targetFloor);
      setTargetFloor(targetFloor - 1);
    }
  }, [targetFloor, arrivalAtTargetFloorTime]);

  useEffect(() => {
    if ((document.timeline.currentTime as number) >= arrivalAtTargetFloorTime) {
      setOpenAtTarget(true);
    } else {
      setOpenAtTarget(false);
      const delay =
        arrivalAtTargetFloorTime - (document.timeline.currentTime as number);
      setTimeout(() => {
        setOpenAtTarget(true);
      }, delay);
    }
  }, [targetFloor, arrivalAtTargetFloorTime]);

  let status = `Floor ${targetFloor + 1}`;
  if (!openAtTarget) {
    if (targetFloor > currentFloor) {
      status = `⬆ Floor ${targetFloor + 1}`;
    } else {
      status = `⬇ Floor ${targetFloor + 1}`;
    }
  }

  const startY = currentFloor * height;
  const newY = targetFloor * height;

  return (
    <m-group {...rest} y={0.01}>
      <m-cube
        width={externalWidth / 2}
        depth={externalDepth + 0.25}
        z={0.125}
        x={-externalWidth * 0.75}
        y={height * levels * 0.5}
        height={height * levels}
        color={"#EEE"}
      ></m-cube>
      <m-cube
        width={externalWidth / 2}
        depth={externalDepth + 0.25}
        z={0.125}
        x={externalWidth * 0.75}
        y={height * levels * 0.5}
        height={height * levels}
        color={"#EEE"}
      ></m-cube>
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
        {Array.from(Array(levels), (e, i) => {
          return (
            <m-group key={i} y={height * i}>
              <SlidingDoors
                y={(height - floorGap) / 2}
                z={externalDepth / 2 + 0.1}
                width={3}
                height={height - floorGap}
                color={"#DDD"}
                open={i === targetFloor && openAtTarget}
              />
              <m-cube
                width={externalWidth}
                depth={0.25}
                z={externalDepth / 2 + 0.125}
                x={0}
                y={height - floorGap / 2}
                height={floorGap}
                color={"#EEE"}
              >
                <m-label
                  content={`Floor ${i + 1}`}
                  alignment="left"
                  height={floorGap * 0.75}
                  z={0.133}
                  width={externalWidth - 0.1}
                  color={"#EEE"}
                />
              </m-cube>
              <SimpleSwitch
                x={2}
                y={1}
                z={externalDepth / 2 + 0.25}
                color={i === targetFloor ? "#0F0" : "#F00"}
                onClick={() => {
                  if (
                    (document.timeline.currentTime as number) <
                      arrivalAtTargetFloorTime ||
                    targetFloor === i
                  ) {
                    return;
                  }
                  setStartTime(document.timeline.currentTime as number);
                  setCurrentFloor(targetFloor);
                  setTargetFloor(i);
                }}
              ></SimpleSwitch>
            </m-group>
          );
        })}
        <m-group>
          <m-attr-anim
            attr="y"
            duration={Math.abs(currentFloor - targetFloor) * floorTime}
            start-time={startTime + doorDuration}
            easing="easeInOutQuad"
            loop={"false"}
            start={startY.toString(10)}
            end={newY.toString(10)}
          />
          <BasicRoom
            width={externalWidth - 0.1}
            depth={externalDepth - 0.1}
            wallConfig={{
              height: height - floorGap,
              depth: 0.05,
              south: { invisible: true },
            }}
            hasCeiling
          >
            <SlidingDoors
              y={(height - floorGap) / 2}
              z={externalDepth / 2}
              width={3}
              height={height - floorGap}
              open={openAtTarget}
              color={"#DDD"}
            />
            <m-label
              content="Up"
              alignment="center"
              ry={-90}
              height={0.5}
              x={externalWidth / 2 - 0.08}
              y={1.4}
              z={0.5}
            />
            <SimpleSwitch
              x={externalWidth / 2 - 0.08}
              y={1}
              z={-0.5}
              ry={-90}
              onClick={goDown}
            />
            <m-label
              content="Down"
              alignment="center"
              ry={-90}
              height={0.5}
              x={externalWidth / 2 - 0.08}
              y={1.4}
              z={-0.5}
            />
            <m-label
              content={`Status: ${status}`}
              width={3}
              alignment="center"
              ry={-90}
              height={0.5}
              x={externalWidth / 2 - 0.08}
              y={2}
              z={0}
            />
            <SimpleSwitch
              x={externalWidth / 2 - 0.08}
              y={1}
              z={0.5}
              ry={-90}
              onClick={goUp}
            />
          </BasicRoom>
        </m-group>
      </BasicRoom>
    </m-group>
  );
}
