import {
  MCubeElement,
  MMLCollisionEndEvent,
  MMLCollisionMoveEvent,
  MMLCollisionStartEvent,
} from "@mml-io/mml-react-types";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { GroupProps } from "../../types";
import { hslToHex } from "../utils/hslToHex";

type ConnectionEvent = CustomEvent<{ connectionId: number }>;

type Position = { x: number; y: number; z: number };
export type UserState = {
  position: Position;
};

type FloorProps = GroupProps & {
  width: number;
  depth: number;
  visible?: boolean;
};

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

export default function DiscoFloor(props: FloorProps) {
  const { width, depth, ...rest } = props;
  const [dataUri, setDataUri] = useState<string>("");

  const floorRef = useRef<MCubeElement>(null);
  const connectedUsersRef = useRef(new Map<number, UserState>());

  function getOrCreateUser(connectionId: number, position: Position) {
    const user = connectedUsersRef.current.get(connectionId);
    if (user) {
      user.position = position;
      return user;
    }

    const newUser = {
      position,
    };
    connectedUsersRef.current.set(connectionId, newUser);
    return newUser;
  }

  function clearUser(connectionId: number) {
    const user = connectedUsersRef.current.get(connectionId);
    if (!user) {
      return;
    }
    connectedUsersRef.current.delete(connectionId);
  }

  const drawState = useCallback(() => {
    const canvasWidth = width * 30;
    const canvasHeight = depth * 30;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const scaleX = canvasWidth / width;
    const scaleY = canvasHeight / depth;
    const pointDrawSize = canvasWidth / 15;
    const halfPointDrawSize = pointDrawSize / 2;
    if (!ctx) {
      return;
    }

    const fillHue = ((Date.now() % 20000) / 20000) * 360;
    ctx.fillStyle = hslToHex(fillHue, 1, 0.5);
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const presenceHue = (((Date.now() + 10000) % 20000) / 20000) * 360;
    ctx.fillStyle = hslToHex(presenceHue, 1, 0.5);
    for (const [, user] of connectedUsersRef.current) {
      ctx.fillRect(
        canvasWidth / 2 + user.position.x * scaleX - halfPointDrawSize,
        canvasHeight / 2 - user.position.z * scaleY - halfPointDrawSize,
        pointDrawSize,
        pointDrawSize,
      );
    }
    setDataUri(canvas.toDataURL("image/png"));
  }, [width, depth]);

  useEffect(() => {
    if (!floorRef.current) {
      return;
    }
    function handleCollisionStart(event: MMLCollisionStartEvent) {
      const { connectionId } = event.detail;
      getOrCreateUser(connectionId, event.detail.position);
    }

    function handleCollisionMove(event: MMLCollisionMoveEvent) {
      const { connectionId } = event.detail;
      getOrCreateUser(connectionId, event.detail.position);
    }

    function handleCollisionEnd(event: MMLCollisionEndEvent) {
      const { connectionId } = event.detail;
      connectedUsersRef.current.delete(connectionId);
    }

    const floor = floorRef.current;
    floor.addEventListener("collisionstart", handleCollisionStart);
    floor.addEventListener("collisionmove", handleCollisionMove);
    floor.addEventListener("collisionend", handleCollisionEnd);
    return () => {
      floor.removeEventListener("collisionstart", handleCollisionStart);
      floor.removeEventListener("collisionmove", handleCollisionMove);
      floor.removeEventListener("collisionend", handleCollisionEnd);
    };
  }, [drawState, floorRef]);

  useEffect(() => {
    drawState();
    const interval = setInterval(drawState, 100);
    return () => {
      clearInterval(interval);
    };
  }, [drawState]);

  const handleDisconnected = useCallback((event: Event) => {
    const { connectionId } = (event as ConnectionEvent).detail;
    clearUser(connectionId);
  }, []);

  useEffect(() => {
    window.addEventListener("disconnected", handleDisconnected);
    return () => {
      window.removeEventListener("disconnected", handleDisconnected);
    };
  }, [handleDisconnected]);

  return (
    <m-group y={0.05} {...rest}>
      <m-cube
        id="floor"
        ref={floorRef}
        width={width}
        depth={depth}
        height={0.1}
        opacity={props.visible ? 1 : 0}
        y={-0.05}
        collision-interval={100}
      />
      <m-image
        id="canvas-view"
        src={dataUri}
        rx={90}
        y={0.01}
        collide={"false"}
        width={width}
        height={depth}
      ></m-image>
    </m-group>
  );
}
