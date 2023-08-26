import {
  MCubeElement,
  MMLCollisionEndEvent,
  MMLCollisionStartEvent,
} from "@mml-io/mml-react-types";
import React, { useState } from "react";

import { GroupProps } from "../../types";
import SlidingDoors from "../utils/SlidingDoors";

type AutomaticDoorsProps = GroupProps & {
  width: number;
  height: number;
  color?: string;
  visiblePlatform?: boolean;
};

export default function AutomaticDoors(props: AutomaticDoorsProps) {
  const [collidingUsers, setCollidingUsers] = useState<Set<number>>(new Set());

  return (
    <m-group id="sliding-doors" {...props}>
      <SlidingDoors
        width={props.width}
        height={props.height}
        open={collidingUsers.size > 0}
        color={props.color}
      />
      <m-cube
        width={props.width}
        height={0.1}
        depth={5}
        visible={props.visiblePlatform ?? false}
        y={-props.height / 2 + 0.01}
        collision-interval={500}
        ref={(el: MCubeElement) => {
          if (!el) {
            return;
          }
          el.addEventListener(
            "collisionstart",
            (event: MMLCollisionStartEvent) => {
              const { connectionId } = event.detail;
              setCollidingUsers(
                new Set(Array.from(collidingUsers).concat([connectionId]))
              );
            }
          );
          el.addEventListener("collisionend", (event: MMLCollisionEndEvent) => {
            const { connectionId } = event.detail;
            const newSet = new Set(Array.from(collidingUsers));
            newSet.delete(connectionId);
            setCollidingUsers(newSet);
          });
        }}
      />
    </m-group>
  );
}
