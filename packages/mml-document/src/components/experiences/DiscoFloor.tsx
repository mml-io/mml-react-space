import React, { useEffect, useRef } from "react";

import { GroupProps, Position, Rotation } from "../../types";
import { CustomElement } from "../../types/declaration";

type FloorProps = GroupProps & {
  width: number;
  depth: number;
  visible?: boolean;
};

const colors = ["red", "blue", "green", "purple", "yellow", "pink", "orange"];

export default function DiscoFloor(props: FloorProps) {
  const { width, depth, ...rest } = props;

  // Initial color index
  const floorRef = useRef<CustomElement<any>>(null);
  const canvasRef = useRef<CustomElement<any>>(null);
  const timeRef = useRef<number>(0);
  const connectedUsersRef = useRef(new Map<string, any>());

  function getOrCreateUser(
    connectionId: string,
    position: Position,
    rotation: Rotation
  ) {
    const user = connectedUsersRef.current.get(connectionId);
    if (user) {
      user.position = position;
      user.rotation = rotation;
      return user;
    }

    const newUser = {
      position,
      rotation,
    };
    connectedUsersRef.current.set(connectionId, newUser);
    return newUser;
  }

  function clearUser(connectionId: string) {
    const user = connectedUsersRef.current.get(connectionId);
    if (!user) return;
    user.cube.remove();
    connectedUsersRef.current.delete(connectionId);
  }

  useEffect(() => {
    function drawState() {
      const canvasView = canvasRef.current;

      if (!canvasView) return;

      const canvas = document.createElement("canvas");
      const canvasWidth = width * 30;
      const canvasHeight = depth * 30;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const scaleX = canvasWidth / width;
      const scaleY = canvasHeight / depth;
      const pointDrawSize = canvasWidth / 10;
      const halfPointDrawSize = pointDrawSize / 2;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.fillStyle = "green";
      for (const [, user] of connectedUsersRef.current) {
        ctx.fillRect(
          canvasWidth / 2 + user.position.x * scaleX - halfPointDrawSize,
          canvasHeight / 2 - user.position.z * scaleY - halfPointDrawSize,
          pointDrawSize,
          pointDrawSize
        );
      }
      ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
      const dataUri = canvas.toDataURL("image/png");
      canvasView.setAttribute("src", dataUri);
    }

    drawState();

    function handleCollisionStart(event: Event) {
      console.log("collision start");
      const { connectionId } = (event as any).detail;
      getOrCreateUser(
        connectionId,
        (event as any).detail.position,
        (event as any).detail.rotation
      );
      drawState();
    }

    function handleCollisionMove(event: Event) {
      const { connectionId } = (event as any).detail;
      getOrCreateUser(
        connectionId,
        (event as any).detail.position,
        (event as any).detail.rotation
      );
      drawState();
    }

    function handleCollisionEnd(event: Event) {
      const { connectionId } = (event as any).detail;
      connectedUsersRef.current.delete(connectionId);
      drawState();
    }

    const floor = floorRef.current;

    floor?.addEventListener("collisionstart", handleCollisionStart);
    floor?.addEventListener("collisionmove", handleCollisionMove);
    floor?.addEventListener("collisionend", handleCollisionEnd);

    function handleDisconnected(event: Event) {
      const { connectionId } = (event as any).detail;
      clearUser(connectionId);
      drawState();
    }

    window.addEventListener("disconnected", handleDisconnected);

    return () => {
      window.removeEventListener("disconnected", handleDisconnected);
      floor?.removeEventListener("collisionstart", handleCollisionStart);
      floor?.removeEventListener("collisionmove", handleCollisionMove);
      floor?.removeEventListener("collisionend", handleCollisionEnd);
    };
  }, [depth, width]);

  useEffect(() => {
    // Change color every 500ms
    const interval = setInterval(() => {
      if (!floorRef.current) return;

      const floor = floorRef.current;
      const time = timeRef.current;
      const cellColor = colors[time % colors.length];
      floor.setAttribute("color", cellColor);
      timeRef.current = time + 1;
    }, 500);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <m-group y={0.05} {...rest}>
      <m-cube
        id="floor"
        ref={floorRef}
        width={width}
        depth={depth}
        height={0.1}
        opacity={props.visible ? 1 : 0}
        x={0}
        z={0}
        y={-0.05}
        color={"red"}
        collision-interval="100"
      />
      <m-image
        id="canvas-view"
        ref={canvasRef}
        rx="90"
        y="0.01"
        collide="false"
        width={width}
        height={depth}
      ></m-image>
    </m-group>
  );
}
