import * as React from "react";
import { useEffect, useRef } from "react";

import { CustomElement } from "../../types/declaration";

const connectedUsers = new Map();
export default function WallProbe() {
  const userProbesRef = useRef<CustomElement<any>>();
  const probeRef = useRef<CustomElement<any>>();

  useEffect(() => {
    function getOrCreateUser(
      connectionId: number,
      position: { x: number; y: number; z: number },
      rotation: { x: number; y: number; z: number }
    ) {
      const user = connectedUsers.get(connectionId);
      if (user) {
        user.position = position;
        user.rotation = rotation;
        return user;
      }
      const userCube = document.createElement("m-cube");

      userCube.setAttribute("collide", "false");
      userCube.setAttribute("width", "0.25");
      userCube.setAttribute("height", "0.25");
      userCube.setAttribute("depth", "0.25");
      userCube.setAttribute(
        "color",
        `#${Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")}`
      );

      userProbesRef.current?.appendChild(userCube);

      const newUser = {
        cube: userCube,
        position,
        rotation,
      };

      connectedUsers.set(connectionId, newUser);
      return newUser;
    }

    function clearUser(connectionId: number) {
      const user = connectedUsers.get(connectionId);
      if (!user) return;
      user.cube.remove();
      connectedUsers.delete(connectionId);
    }

    function setCubePosition(
      connectionId: number,
      position: { x: number; y: number; z: number },
      rotation: { x: number; y: number; z: number }
    ) {
      const user = getOrCreateUser(connectionId, position, rotation);
      user.cube.setAttribute("x", position.x);
      user.cube.setAttribute("y", position.y + 2);
      user.cube.setAttribute("z", position.z);
      user.cube.setAttribute("rx", rotation.x);
      user.cube.setAttribute("ry", rotation.y);
      user.cube.setAttribute("rz", rotation.z);
    }

    // At the moment there seems to be no way to attach an event the react way
    const userProbe = probeRef.current;
    userProbe?.addEventListener("positionenter", (event: any) => {
      const { connectionId, elementRelative } = event.detail;
      setCubePosition(
        connectionId,
        elementRelative.position,
        elementRelative.rotation
      );
    });

    userProbe?.addEventListener("positionmove", (event: any) => {
      const { connectionId, elementRelative } = event.detail;
      setCubePosition(
        connectionId,
        elementRelative.position,
        elementRelative.rotation
      );
    });

    userProbe?.addEventListener("positionleave", (event: any) => {
      const { connectionId } = event.detail;
      clearUser(connectionId);
    });

    function handleConnected(event: any) {
      const { connectionId, position, rotation } = event.detail;
      getOrCreateUser(connectionId, position, rotation);
    }

    window.addEventListener("disconnected", handleConnected);

    return () => {
      window.removeEventListener("disconnected", handleConnected);
    };
  }, []);

  return (
    <m-group y={-5.5}>
      <m-position-probe ref={probeRef} range="8" id="my-probe" interval="100" />
      <m-group ref={userProbesRef} id="user-presence-holder" />
    </m-group>
  );
}
