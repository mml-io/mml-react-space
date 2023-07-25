import React from "react";

import Bookshelf from "../components/furniture/Bookshelf";
import Chair from "../components/furniture/Chair";
import Desk from "../components/furniture/Desk";
import Lamp from "../components/furniture/Lamp";
import BasicRoom from "../components/structures/BasicRoom";
import { RoomProps } from "../types";

export default function Studio(props: RoomProps) {
  return (
    <BasicRoom
      floorConfig={{ color: "rgb(84,64,51)" }}
      width={5}
      depth={5}
      hasCeiling
      {...props}
    >
      {props.children}
      <Desk />
      <Chair z={-0.3} />
      <Lamp y="0.9" ry="-50" z="0.1" x="-0.5" sx={0.3} sy={0.3} sz={0.3} />
      <Bookshelf x="1.5" z="-2.15" />
      <Bookshelf x="-1.5" z="-2.15" />
    </BasicRoom>
  );
}
