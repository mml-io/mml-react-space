import * as React from "react";

import TicTacToe from "../components/experiences/TicTacToe";
import Dice from "../components/furniture/Dice";
import Duck from "../components/furniture/Duck";
import BasicRoom, { WallConfig } from "../components/structures/BasicRoom";
import Level from "../components/structures/Level";
import Stairs from "../components/structures/Stairs";
import Wall from "../components/structures/Wall";
import WallWithWindow from "../components/structures/WallWithWindow";
import LongRoom from "../rooms/museum/LongRoom";
import SideRoom from "../rooms/museum/SideRoom";
import { GroupProps } from "../types";

const longoRoomDoorConfig: WallConfig = {
  north: {
    invisible: true,
  },
  south: {
    invisible: true,
  },
  east: {
    invisible: true,
  },
  west: {
    invisible: true,
  },
};

const sideRoomWallConfig: WallConfig = {
  south: {
    hasDoor: true,
  },
  north: {
    invisible: true,
  },
};

const sideRoomWallConfigWest: WallConfig = {
  ...sideRoomWallConfig,
  west: {
    hasWindow: true,
  },
};

const sideRoomWallConfigEast: WallConfig = {
  ...sideRoomWallConfig,
  east: {
    hasWindow: true,
  },
  west: {
    hasWindow: true,
    windowHeight: 2,
    windowWidth: 7,
  },
};

export default function FirstFloor(props: GroupProps) {
  return (
    <Level level={1} {...props}>
      <LongRoom
        wallConfig={longoRoomDoorConfig}
        ceilingConfig={{
          hasOpening: true,
          openingDepth: 3,
          openingWidth: 3,
          openingPosition: {
            x: -23.9,
            z: 2,
          },
        }}
        floorConfig={{
          color: "#9999DD",
          hasOpening: true,
          openingDepth: 3,
          openingWidth: 3,
          openingPosition: {
            x: 23.9,
            z: 2,
          },
        }}
      >
        <WallWithWindow z={5} y={2} width={17} />
        <WallWithWindow x={17} z={5} y={2} width={17} />
        <WallWithWindow x={-17} z={5} y={2} width={17} />
        <Wall height={4} x={-25.5} ry={90} y={2} width={10} />
        <WallWithWindow x={25.5} ry={90} y={2} width={10.3} />
      </LongRoom>
      <SideRoom
        z={-13}
        x={-17}
        wallConfig={sideRoomWallConfigWest}
        floorConfig={{ color: "#9999DD" }}
      >
        <TicTacToe y={1.5} ry={-90} x={8.33} />
      </SideRoom>
      <SideRoom
        z={-13}
        x={17}
        wallConfig={sideRoomWallConfigEast}
        floorConfig={{ color: "#9999DD" }}
      >
        <Dice sx={0.5} sy={0.5} sz={0.5} y={0.05} x={-1} z={-2} />
        <Dice sx={0.5} sy={0.5} sz={0.5} y={0.05} x={3} />
        <Dice sx={0.5} sy={0.5} sz={0.5} y={0.05} x={2} z={6} />
        <Dice sx={0.5} sy={0.5} sz={0.5} y={0.05} x={-4} z={-3} />
        <Dice sx={0.5} sy={0.5} sz={0.5} y={0.05} x={-6} z={4.5} />
        <Dice sx={0.5} sy={0.5} sz={0.5} y={0.05} x={2} z={-5} />
        <Dice sx={0.5} sy={0.5} sz={0.5} y={0.05} x={-6} z={-5} />
      </SideRoom>
      <SideRoom
        z={-13}
        wallConfig={{
          south: { hasDoor: true },
          east: { invisible: true },
          west: { invisible: true },
        }}
        floorConfig={{ color: "#9999DD" }}
      >
        <Duck />
      </SideRoom>
      <BasicRoom
        z={-23}
        width={17}
        depth={4}
        wallConfig={{ east: { invisible: true }, west: { invisible: true } }}
        floorConfig={{ invisible: true }}
        hasCeiling
      />
      <BasicRoom
        x={-17}
        z={-23}
        width={17}
        depth={4}
        wallConfig={{
          east: { invisible: true },
          north: { hasDoor: true },
          south: { hasDoor: true },
          west: { hasWindow: true },
        }}
        floorConfig={{ color: "#9999DD" }}
        hasCeiling
      />
      <BasicRoom
        x={17}
        z={-23}
        width={17}
        depth={4}
        wallConfig={{
          west: { invisible: true },
          north: { hasDoor: true },
          south: { hasDoor: true },
          east: { hasWindow: true },
        }}
        floorConfig={{ color: "#9999DD" }}
        hasCeiling
      />
      <BasicRoom
        z={-30}
        width={51}
        depth={10}
        wallConfig={{
          south: { invisible: true },
          north: { invisible: true },
        }}
        floorConfig={{
          color: "#9999DD",
          hasOpening: true,
          openingDepth: 2,
          openingWidth: 5,
          openingPosition: {
            x: -2,
            z: -2,
          },
        }}
        hasCeiling
        ceilingConfig={{
          hasOpening: true,
          openingPosition: { x: 2.3, z: 4 },
          openingWidth: 5,
          openingDepth: 2,
        }}
      >
        <WallWithWindow x={-12.6} width={25.5} y={2} z={-5} />
        <WallWithWindow x={12.6} width={25.5} y={2} z={-5} />
        <Stairs z={4} stairDepth={2} totalHeight={4} ry={90} />
      </BasicRoom>
    </Level>
  );
}
