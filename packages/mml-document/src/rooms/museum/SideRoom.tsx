import React from "react";

import BasicRoom from "../../components/structures/BasicRoom";
import { RoomProps } from "../../types";

export default function SideRoom(props: RoomProps) {
  return (
    <BasicRoom width={17} depth={16} hasCeiling {...props}>
      {props.children}
    </BasicRoom>
  );
}
