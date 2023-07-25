import React from "react";

import BasicRoom from "../../components/structures/BasicRoom";
import { RoomProps } from "../../types";

export default function LongRoom(props: RoomProps) {
  return (
    <BasicRoom width={51} depth={10} hasCeiling {...props}>
      {props.children}
    </BasicRoom>
  );
}
