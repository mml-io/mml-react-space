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
  hasOpening?: boolean;
  openingPosition?: OpeningPosition;
  openingWidth?: number;
  openingDepth?: number;
};

export default function Floor(props: CeilingProps) {
  const {
    color = "white",
    depth,
    width,
    hasOpening,
    openingPosition = { x: 0, z: 0 },
    openingWidth = 0,
    openingDepth = 0,
    ...rest
  } = props;

  if (!hasOpening) {
    return (
      <m-plane rx={-90} color={color} height={depth} width={width} {...rest} />
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
    <m-group rx={-90} {...rest}>
      {/* North cube */}
      <m-plane
        color={color}
        width={width}
        height={northWallDepth}
        y={-depth / 2 + northWallDepth / 2}
      />
      {/* South cube */}
      <m-plane
        color={color}
        width={width}
        height={southWallDepth}
        y={depth / 2 - southWallDepth / 2}
      />
      {/* West cube */}
      <m-plane
        color={color}
        width={westWallWidth}
        height={openingDepth}
        x={-width / 2 + westWallWidth / 2}
        y={openingPosition.z}
      />
      {/* East cube */}
      <m-plane
        color={color}
        width={eastWallWidth}
        height={openingDepth}
        x={width / 2 - eastWallWidth / 2}
        y={openingPosition.z}
      />
    </m-group>
  );
}
