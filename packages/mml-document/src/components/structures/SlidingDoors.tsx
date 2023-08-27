import {
  MCubeElement,
  MMLCollisionEndEvent,
  MMLCollisionStartEvent,
} from "@mml-io/mml-react-types";
import React, { useEffect, useState } from "react";

import { GroupProps } from "../../types";

type SlidingDoors = GroupProps & {
  width: number;
  height: number;
  color?: string;
  visiblePlatform?: boolean;
};

export default function SlidingDoors(props: SlidingDoors) {
  const [collidingUsers, setCollidingUsers] = useState<Set<number>>(new Set());
  const [currentRatioOpen, setCurrentRatioOpen] = useState(0);

  useEffect(() => {
    const shouldBeOpen = collidingUsers.size > 0;
    let openRatio: number;
    if (shouldBeOpen && currentRatioOpen < 1) {
      openRatio = currentRatioOpen + 0.1;
    } else if (!shouldBeOpen && currentRatioOpen > 0) {
      openRatio = currentRatioOpen - 0.1;
    } else {
      return;
    }
    openRatio = Math.min(Math.max(openRatio, 0), 1);
    const timeout = setTimeout(() => {
      setCurrentRatioOpen(openRatio);
    }, 50);
    return () => {
      clearTimeout(timeout);
    };
  }, [collidingUsers, currentRatioOpen]);

  return (
    <m-group id="sliding-doors" {...props}>
      <m-cube
        id="left-door"
        width={props.width / 2}
        height={props.height}
        depth={0.1}
        x={-props.width / 4 - 0.001 - (currentRatioOpen * props.width) / 2}
        y={0}
        z={0.5}
        collision-interval={500}
        color={props.color || "rgba(255, 255, 255, 0.5)"}
      />
      <m-cube
        id="right-door"
        width={props.width / 2}
        height={props.height}
        depth={0.1}
        x={props.width / 4 + 0.001 + (currentRatioOpen * props.width) / 2}
        y={0}
        z={0.5}
        color={props.color || "rgba(255, 255, 255, 0.5)"}
      />
      <m-cube
        id="collider"
        width={props.width}
        height={0.1}
        depth={5}
        opacity={props.visiblePlatform ? 1 : 0}
        x={0}
        y={-props.height / 2 + 0.01}
        z={0}
        collision-interval="500"
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
