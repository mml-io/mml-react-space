import React from "react";

import { GroupProps } from "../../types";
import Ceiling from "./Ceiling";
import Floor from "./Floor";
import Wall from "./Wall";

const defaultWidth = 20;
const defaultDepth = 20;
const defaultHeight = 4;

type Wall = {
  invisible?: boolean;
  hasDoor?: boolean;
  doorPosition?: number;
  doorWidth?: number;
  doorHeight?: number;
  hasWindow?: boolean;
  windowPosition?: { x: number; y: number };
  windowWidth?: number;
  windowHeight?: number;
};

type BasicRoomProps = GroupProps & {
  level?: number;
  hasCeiling?: boolean;
  ceilingConfig?: {
    color?: string;
    hasOpening?: boolean;
    openingPosition?: {
      x: number;
      z: number;
    };
    openingWidth?: number;
    openingDepth?: number;
  };
  lightColor?: string;
  wallColor?: string;
  onButtonClick?: () => void;
  children?: React.ReactNode;
  width?: number;
  depth?: number;
  wallConfig?: {
    height?: number;
    depth?: number;
    north?: Wall;
    east?: Wall;
    south?: Wall;
    west?: Wall;
  };
  floorConfig?: {
    invisible?: boolean;
    color?: string;
    hasOpening?: boolean;
    openingPosition?: { x: number; z: number };
    openingWidth?: number;
    openingDepth?: number;
  };
};

export type WallConfig = BasicRoomProps["wallConfig"];
export type FloorConfig = BasicRoomProps["floorConfig"];
export type CeilingConfig = BasicRoomProps["ceilingConfig"];

export default function BasicRoom(props: BasicRoomProps) {
  const {
    level = 0,
    hasCeiling,
    ceilingConfig,
    wallConfig = {},
    wallColor = "white",
    floorConfig,
    width = defaultWidth,
    depth = defaultDepth,
    children,
    forwardRef,
    ...groupProps
  } = props;

  const { height = defaultHeight, depth: wallDepth = 0.3 } = wallConfig;

  return (
    <m-group {...groupProps} y={level * height} ref={forwardRef}>
      {hasCeiling && (
        <Ceiling
          width={width + wallDepth}
          depth={depth + wallDepth}
          y={(wallConfig?.height ?? defaultHeight) - 0.05}
          hasOpening={ceilingConfig?.hasOpening}
          openingWidth={ceilingConfig?.openingWidth}
          openingDepth={ceilingConfig?.openingDepth}
          openingPosition={ceilingConfig?.openingPosition}
        />
      )}
      {!floorConfig?.invisible && (
        <Floor
          color={props.floorConfig?.color}
          y={0.05}
          width={width}
          depth={depth}
          rx={-90}
          rz={180}
          hasOpening={floorConfig?.hasOpening}
          openingWidth={floorConfig?.openingWidth}
          openingDepth={floorConfig?.openingDepth}
          openingPosition={floorConfig?.openingPosition}
        />
      )}
      {!wallConfig?.west?.invisible && (
        <Wall
          depth={wallDepth}
          color={wallColor}
          width={depth ?? 20}
          x={-width / 2}
          ry={-90}
          height={wallConfig?.height ?? defaultHeight}
          {...wallConfig?.west}
        />
      )}
      {!wallConfig?.north?.invisible && (
        <Wall
          depth={wallDepth}
          color={wallColor}
          width={width ?? 20}
          z={-depth / 2}
          height={wallConfig?.height ?? defaultHeight}
          {...wallConfig?.north}
        />
      )}
      {!wallConfig?.east?.invisible && (
        <Wall
          depth={wallDepth}
          color={wallColor}
          width={depth ?? 20}
          x={width / 2}
          ry={-90}
          height={wallConfig?.height ?? defaultHeight}
          {...wallConfig?.east}
        />
      )}
      {!wallConfig?.south?.invisible && (
        <Wall
          depth={wallDepth}
          color={wallColor}
          width={width ?? 20}
          z={depth / 2}
          height={wallConfig?.height ?? defaultHeight}
          {...wallConfig?.south}
        />
      )}
      {children}
    </m-group>
  );
}
