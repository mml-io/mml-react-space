import { MGroupAttributes, MGroupElement } from "@mml-io/mml-react-types";
import * as React from "react";

import {
  CeilingConfig,
  FloorConfig,
  WallConfig,
} from "../components/structures/BasicRoom";

export type Position = {
  x?: string | number;
  y?: string | number;
  z?: string | number;
};

export type Scale = {
  sx?: string | number;
  sy?: string | number;
  sz?: string | number;
};

export type Rotation = {
  rx?: string | number;
  ry?: string | number;
  rz?: string | number;
};

export type GroupProps = MGroupAttributes & {
  forwardRef?: React.Ref<MGroupElement>;
};

export type RoomProps = GroupProps & {
  children?: React.ReactNode;
  level?: number;
  wallConfig: WallConfig;
  floorConfig?: FloorConfig;
  ceilingConfig?: CeilingConfig;
};
