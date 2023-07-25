import * as React from "react";

import WallProbe from "../components/experiences/WallProbe";
import BasicRoom, { WallConfig } from "../components/structures/BasicRoom";
import Image from "../components/structures/Image";
import Level from "../components/structures/Level";
import SlidingDoors from "../components/structures/SlidingDoors";
import Stairs from "../components/structures/Stairs";
import VideoPlayer from "../components/structures/VideoPlayer";
import Wall from "../components/structures/Wall";
import Disco from "../rooms/Disco";
import LongRoom from "../rooms/museum/LongRoom";
import SideRoom from "../rooms/museum/SideRoom";
import { GroupProps } from "../types";

const longoRoomDoorConfig: WallConfig = {
  south: {
    hasDoor: true,
    doorWidth: 3,
    doorHeight: 2.5,
  },
  north: {
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

export default function GroundFloor(props: GroupProps) {
  return (
    <Level {...props}>
      <LongRoom
        floorConfig={{ color: "#777777" }}
        wallConfig={longoRoomDoorConfig}
        ceilingConfig={{
          hasOpening: true,
          openingDepth: 2,
          openingWidth: 3,
          openingPosition: {
            x: -23.9,
            z: 3.9,
          },
        }}
      >
        <SlidingDoors width={3} height={2.5} z={4.5} y={1.25} color="brown" />
        <Image
          y={2}
          height={2}
          ry={180}
          z={4.845}
          x={-13}
          src="https://th.bing.com/th/id/OIG.imbCgMCkKC97i_xcAiEC?pid=ImgGn"
        />
        <Image
          y={2}
          height={2}
          ry={180}
          z={4.845}
          x={13}
          src="https://th.bing.com/th/id/OIG.mpq5uHSte40eK4rVzpZI?pid=ImgGn"
        />
      </LongRoom>
      <SideRoom
        z={-13}
        x={-17}
        wallConfig={sideRoomWallConfig}
        floorConfig={{
          color: "#777777",
        }}
      >
        <Wall height={3.5} width={10} x={0} color="red">
          <WallProbe />
        </Wall>
      </SideRoom>
      <BasicRoom
        x={0}
        z={-15}
        width={17}
        depth={20}
        wallConfig={{ south: { invisible: true } }}
        hasCeiling={true}
        floorConfig={{ color: "#777777" }}
        ceilingConfig={{
          hasOpening: true,
          openingWidth: 17,
          openingDepth: 3,
          openingPosition: { x: 0, z: -8.15 },
        }}
      >
        <Image
          y={2}
          height={2}
          z={0}
          ry={90}
          x={-8.32}
          src="https://th.bing.com/th/id/OIG.AaAM6NrmDfvCZtGUQegp?pid=ImgGn"
        />
        <Image
          y={2}
          height={2}
          z={0}
          ry={-90}
          x={8.32}
          src="https://th.bing.com/th/id/OIG.3BWxbypQ_qfrmNHcl0HK?pid=ImgGn"
        />
        <Stairs
          totalWidth={3}
          totalHeight={2}
          numStairs={6}
          stairDepth={4}
          ry={180}
          x={0}
          z={-3.25}
          filled
        />
        <m-cube
          width={5}
          depth={4}
          height={0.35}
          z={-8}
          y={1.825}
          collide={true}
        />
        <Stairs
          stairDepth={3.2}
          totalWidth={5.8}
          totalHeight={2}
          ry={90}
          z={-8.25}
          y={2}
          x={2.75}
        />
        <Stairs
          stairDepth={3.2}
          totalWidth={5.8}
          totalHeight={2}
          ry={-90}
          z={-8.25}
          y={2}
          x={-2.75}
        />
      </BasicRoom>
      <SideRoom
        z={-13}
        x={17}
        wallConfig={sideRoomWallConfig}
        floorConfig={{
          color: "#777777",
        }}
      >
        <Wall height={3.5} width={10} x={0} color="yellow" />
        <VideoPlayer
          z={0.16}
          width={4}
          y={-0.3}
          controls
          src="https://public.mml.io/charge.mp4"
        />
      </SideRoom>
      {/* Small room northwest 1 */}
      <BasicRoom
        x={-21.25}
        z={-28}
        width={8.5}
        depth={14}
        hasCeiling={true}
        wallConfig={{ south: { hasDoor: true }, east: { hasDoor: true } }}
        floorConfig={{
          color: "#777777",
        }}
      />
      {/* Small room northwest 2 */}
      <BasicRoom
        x={-12.75}
        z={-28}
        width={8.5}
        depth={14}
        hasCeiling={true}
        wallConfig={{
          south: { hasDoor: true },
          east: { hasDoor: true, doorPosition: 5.5 },
          west: { invisible: true },
        }}
        floorConfig={{
          color: "#777777",
        }}
      />
      {/* Small room north */}
      <Disco
        x={0}
        z={-30}
        wallConfig={{
          south: { invisible: true },
          east: { invisible: true },
          west: { invisible: true },
        }}
        floorConfig={{
          color: "#777777",
        }}
      />
      {/* Small room northeast */}
      <BasicRoom
        x={17}
        z={-28}
        width={17}
        depth={14}
        hasCeiling={true}
        wallConfig={{
          west: { hasDoor: true, doorPosition: 5.5 },
          south: { hasDoor: true },
        }}
        floorConfig={{
          color: "#777777",
        }}
      />
    </Level>
  );
}
