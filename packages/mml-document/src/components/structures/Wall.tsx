import React from "react";

import WallWithWindow from "./WallWithWindow";
import { GroupProps } from "../../types";

type WallProps = GroupProps & {
  color?: string;
  height: number;
  width: number;
  depth?: number;
  x?: number;
  z?: number;
  hasDoor?: boolean;
  doorPosition?: number;
  doorWidth?: number;
  doorHeight?: number;
  hasWindow?: boolean;
  windowPosition?: { x: number; y: number };
  windowWidth?: number;
  windowHeight?: number;
  children?: React.ReactNode;
};

export default function Wall(props: WallProps) {
  const {
    color = "white",
    z = 0,
    height,
    hasDoor,
    width,
    depth = 0.3,
    x = 0,
    ry,
    doorWidth = 1.2,
    doorHeight = 2.25,
    hasWindow,
    windowPosition = { x: 0, y: 0 },
    windowWidth = 2,
    windowHeight = 2,
    children,
    ...rest
  } = props;

  const adjustedWidth = width + depth;

  const doorPosition = props.doorPosition ?? adjustedWidth / 2;

  if (hasDoor) {
    return (
      <m-group
        ry={ry}
        y={height ? height / 2 : 3}
        x={!ry ? -adjustedWidth / 2 : x}
        z={ry !== 0 && !z ? -adjustedWidth / 2 : z}
        {...rest}
      >
        <m-cube
          color={color}
          depth="0.3"
          height={height ?? 6}
          x={(doorPosition - doorWidth / 2) / 2}
          width={doorPosition - doorWidth / 2}
          collide={true}
        />
        <m-cube
          color={color}
          depth="0.3"
          height={height ?? 6}
          x={(adjustedWidth + doorPosition + doorWidth / 2) / 2}
          width={adjustedWidth - doorPosition - doorWidth / 2}
          collide={true}
        />
        <m-cube
          color={color}
          depth="0.3"
          x={doorPosition}
          width={doorWidth}
          height={height - doorHeight}
          y={doorHeight / 2}
          collide={true}
        />
        {children}
      </m-group>
    );
  }

  if (hasWindow) {
    return (
      <WallWithWindow
        windowPosition={windowPosition}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        x={x}
        height={height}
        z={z}
        ry={ry}
        width={width}
        depth={depth}
        color={color}
        y={height / 2}
        {...rest}
      >
        {children}
      </WallWithWindow>
    );
  }

  return (
    <m-cube
      collide={true}
      color={color}
      depth={depth}
      height={height}
      width={adjustedWidth}
      y={height / 2}
      x={x}
      z={z}
      ry={ry}
      {...rest}
    >
      {children}
    </m-cube>
  );
}
