import React from "react";

import { GroupProps } from "../../types";

type OpeningPosition = {
  x: number;
  z: number;
};

type CeilingProps = GroupProps & {
  color?: string;
  width: number;
  depth: number;
  y: number;
  hasOpening?: boolean;
  openingPosition?: OpeningPosition;
  openingWidth?: number;
  openingDepth?: number;
};

export default function Ceiling(props: CeilingProps) {
  const {
    color = "white",
    depth,
    width,
    y,
    hasOpening,
    openingPosition = { x: 0, z: 0 },
    openingWidth = 0,
    openingDepth = 0,
    ...rest
  } = props;

  if (!hasOpening) {
    return (
      <m-cube
        color={color}
        depth={depth}
        height={0.1}
        width={width}
        y={y}
        {...rest}
      />
    );
  }

  const northWallDepth = Math.max(
    depth / 2 - openingDepth / 2 + openingPosition.z,
    0,
  );
  const southWallDepth = Math.max(
    depth / 2 - openingDepth / 2 - openingPosition.z,
    0,
  );
  const eastWallWidth = Math.max(
    width / 2 - openingWidth / 2 - openingPosition.x,
    0,
  );
  const westWallWidth = Math.max(
    width / 2 - openingWidth / 2 + openingPosition.x,
    0,
  );

  return (
    <m-group {...rest}>
      {/* North cube */}
      <m-cube
        color={color}
        width={width}
        depth={northWallDepth}
        height={0.1}
        z={-depth / 2 + northWallDepth / 2}
        y={y}
      />
      {/* South cube */}
      <m-cube
        color={color}
        width={width}
        depth={southWallDepth}
        height={0.1}
        z={depth / 2 - southWallDepth / 2}
        y={y}
      />
      {/* West cube */}
      <m-cube
        color={color}
        width={westWallWidth}
        depth={openingDepth}
        height={0.1}
        x={-width / 2 + westWallWidth / 2}
        z={openingPosition.z}
        y={y}
      />
      {/* East cube */}
      <m-cube
        color={color}
        width={eastWallWidth}
        depth={openingDepth}
        height={0.1}
        x={width / 2 - eastWallWidth / 2}
        z={openingPosition.z}
        y={y}
      />
    </m-group>
  );
}
