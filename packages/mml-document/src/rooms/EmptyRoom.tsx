import * as React from "react";

import BasicRoom, { WallConfig } from "../components/structures/BasicRoom";
import { RoomProps } from "../types";

export default function EmptyRoom(props: RoomProps) {
  const wallConfig: WallConfig = {
    west: {
      invisible: true,
    },
  };

  return (
    <BasicRoom width={5} depth={5} {...props} wallConfig={wallConfig}>
      {props.children}
    </BasicRoom>
  );
}
