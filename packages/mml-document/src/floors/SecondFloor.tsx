import * as React from "react";

import BasicRoom from "../components/structures/BasicRoom";
import MMLImage from "../components/structures/Image";
import Level from "../components/structures/Level";
import Wall from "../components/structures/Wall";
import WallWithWindow from "../components/structures/WallWithWindow";
import Studio from "../rooms/Studio";
import { GroupProps } from "../types";

export default function SecondFloor(props: GroupProps) {
  return (
    <Level level={2} {...props}>
      <BasicRoom
        width={25}
        depth={25}
        z={-22.5}
        x={-13}
        hasCeiling
        ceilingConfig={{
          hasOpening: true,
          openingWidth: 18,
          openingDepth: 18,
        }}
        wallConfig={{
          south: {
            invisible: true,
          },
          north: {
            hasWindow: true,
            windowPosition: {
              y: 0,
              x: 0.4,
            },
          },
          west: {
            hasWindow: true,
            windowPosition: {
              y: 0,
              x: -0.5,
            },
          },
        }}
      />
      <BasicRoom
        width={51}
        depth={15}
        z={-2.5}
        wallConfig={{
          north: {
            invisible: true,
          },
          south: {
            invisible: true,
          },
          east: {
            hasWindow: true,
            windowPosition: {
              y: 0,
              x: 2.5,
            },
          },
          west: {
            hasWindow: true,
            windowPosition: {
              y: 0,
              x: 2.5,
            },
          },
        }}
        floorConfig={{
          color: "green",
          hasOpening: true,
          openingDepth: 2,
          openingWidth: 3,
          openingPosition: {
            x: 23.9,
            z: 6.4,
          },
        }}
        hasCeiling
      >
        <WallWithWindow y={2} z={7.5} width={17.3} />
        <WallWithWindow x={17} z={7.5} y={2} width={17.3} />
        <WallWithWindow x={-17} z={7.5} y={2} width={17.3} />
      </BasicRoom>
      <BasicRoom
        x={10}
        z={-22.5}
        wallConfig={{
          east: { invisible: true },
          south: { hasDoor: true },
          north: { hasWindow: true, windowPosition: { x: 2.6, y: 0 } },
        }}
        floorConfig={{
          color: "green",
          hasOpening: true,
          openingPosition: { x: 7.7, z: -3.5 },
          openingWidth: 5,
          openingDepth: 2,
        }}
        width={21}
        depth={25}
        hasCeiling
      >
        <m-group ry={43.8} z={2.5}>
          <Wall height={4} width={28.5} ry={0} z={0} hasDoor />
        </m-group>
        <MMLImage
          src={[
            "https://th.bing.com/th/id/OIG.i0L1T8Nn.R8UVPprcpbf?pid=ImgGn",
            "https://th.bing.com/th/id/OIG.Suomwew7OiqoneMad_PG?pid=ImgGn",
            "https://th.bing.com/th/id/OIG.ZkrDPYNdHj3lPwJUA1Jl?pid=ImgGn",
            "https://th.bing.com/th/id/OIG.CjajF71pzFuP4lE3u4t4?pid=ImgGn",
          ]}
          y={2.5}
          x={-10.3}
          width={2}
          ry={90}
          buttonsPosition={-1.05}
        />
      </BasicRoom>
      <BasicRoom
        hasCeiling
        floorConfig={{
          color: "green",
        }}
        x={23}
        z={-20}
        wallConfig={{
          north: { invisible: true },
          west: { invisible: true },
          east: { hasWindow: true, windowPosition: { x: 7, y: 0 } },
        }}
        width={5}
        depth={20}
      ></BasicRoom>
      <Studio
        wallConfig={{ east: { hasWindow: true }, south: { hasDoor: true } }}
        x={23}
        z={-32.5}
      />
    </Level>
  );
}
