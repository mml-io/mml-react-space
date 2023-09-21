import React from "react";

import { GroupProps } from "../../types";

type WallProps = GroupProps & {
  color?: string;
  height?: number;
  width?: number;
  depth?: number;
  x?: number;
  z?: number;
  windowPosition?: {
    x: number;
    y: number;
  };
  windowWidth?: number;
  windowHeight?: number;
  children?: React.ReactNode;
};

export default function WallWithWindow(props: WallProps) {
  const {
    color = "white",
    height = 4,
    width = 10,
    depth = 0.3,
    windowWidth = 2,
    windowHeight = 2,
    windowPosition = { x: 0, y: 0 },
    children,
    ...rest
  } = props;

  const topWallHeight = Math.max(
    height / 2 - windowHeight / 2 + windowPosition.y,
    0
  );
  const bottomWallHeight = Math.max(
    height / 2 - windowHeight / 2 - windowPosition.y,
    0
  );
  const rightWallWidth = Math.max(
    width / 2 - windowWidth / 2 - windowPosition.x,
    0
  );
  const leftWallWidth = Math.max(
    width / 2 - windowWidth / 2 + windowPosition.x,
    0
  );

  return (
    <m-group {...rest}>
      {/* North cube */}
      <m-cube
        color={color}
        width={width}
        depth={depth}
        height={topWallHeight}
        y={-height / 2 + topWallHeight / 2}
      />
      {/* South cube */}
      <m-cube
        color={color}
        width={width}
        depth={depth}
        height={bottomWallHeight}
        y={height / 2 - bottomWallHeight / 2}
      />
      {/* West cube */}
      <m-cube
        color={color}
        width={leftWallWidth}
        depth={depth}
        height={height}
        x={-width / 2 + leftWallWidth / 2}
      />
      {/* East cube */}
      <m-cube
        color={color}
        width={rightWallWidth}
        depth={depth}
        height={height}
        x={width / 2 - rightWallWidth / 2}
      />
      {children}
    </m-group>
  );
}
