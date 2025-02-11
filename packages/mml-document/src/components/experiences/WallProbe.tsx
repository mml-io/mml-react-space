import {
  MMLPositionLeaveEvent,
  MPositionProbeElement,
} from "@mml-io/mml-react-types";
import * as React from "react";

const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
};

export default function WallProbe() {
  const [connectedUsers, setConnectedUsers] = React.useState<{
    [connectionId: string]: {
      position: { x: number; y: number; z: number };
      rotation: { x: number; y: number; z: number };
      lastPosition: { x: number; y: number; z: number };
      lastRotation: { x: number; y: number; z: number };
      time: number;
      color: string;
    };
  }>({});

  const probeRef = React.useRef<MPositionProbeElement>(null);

  const interval = 200;

  const handlePositionEnter = React.useCallback((event: any) => {
    const { connectionId, elementRelative } = event.detail;
    setConnectedUsers((prevConnectedUsers) => {
      const user = prevConnectedUsers[connectionId];
      if (user) {
        return {
          ...prevConnectedUsers,
          [connectionId]: {
            position: elementRelative.position,
            rotation: elementRelative.rotation,
            lastPosition: user.position,
            lastRotation: user.rotation,
            time: document.timeline.currentTime as number,
            color: user.color,
          },
        };
      }
      return {
        ...prevConnectedUsers,
        [connectionId]: {
          position: elementRelative.position,
          rotation: elementRelative.rotation,
          lastPosition: elementRelative.position,
          lastRotation: elementRelative.rotation,
          time: document.timeline.currentTime as number,
          color: prevConnectedUsers[connectionId]
            ? prevConnectedUsers[connectionId].color
            : generateRandomColor(),
        },
      };
    });
  }, []);

  const handlePositionMove = handlePositionEnter; // Reuse for simplicity.

  const handlePositionLeave = React.useCallback(
    (event: MMLPositionLeaveEvent) => {
      const { connectionId } = event.detail;
      setConnectedUsers((prevConnectedUsers) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [connectionId]: user, ...remainingUsers } = prevConnectedUsers;
        return remainingUsers;
      });
    },
    [],
  );

  const handleDisconnect = handlePositionLeave; // Reuse for simplicity.

  React.useEffect(() => {
    const userProbe = probeRef.current;

    userProbe?.addEventListener("positionenter", handlePositionEnter);
    userProbe?.addEventListener("positionmove", handlePositionMove);
    userProbe?.addEventListener("positionleave", handlePositionLeave);
    (window as any).addEventListener("disconnected", handleDisconnect);

    return () => {
      userProbe?.removeEventListener("positionenter", handlePositionEnter);
      userProbe?.removeEventListener("positionmove", handlePositionMove);
      userProbe?.removeEventListener("positionleave", handlePositionLeave);
      (window as any).removeEventListener("disconnected", handleDisconnect);
    };
  }, [
    handlePositionEnter,
    handlePositionMove,
    handlePositionLeave,
    handleDisconnect,
    probeRef,
  ]);

  return (
    <m-group y={-5.5}>
      <m-position-probe
        ref={probeRef}
        range={8}
        id="my-probe"
        interval={interval}
      />
      <m-group id="user-presence-holder">
        {Object.entries(connectedUsers).map(([connectionId, user]) => (
          <m-group
            key={connectionId}
            /*  The rx and rz attributes are unlikely to change so they do not need to be animated */
            rx={user.rotation.x}
            rz={user.rotation.z}
            y={3}
          >
            <m-attr-anim
              attr={"x"}
              start-time={user.time}
              duration={interval}
              loop={"false"}
              start={user.lastPosition.x.toString(10)}
              end={user.position.x.toString(10)}
            />
            <m-attr-anim
              attr={"y"}
              start-time={user.time}
              duration={interval}
              loop={"false"}
              start={(user.lastPosition.y + 2).toString(10)}
              end={(user.position.y + 2).toString(10)}
            />
            <m-attr-anim
              attr={"z"}
              start-time={user.time}
              duration={interval}
              loop={"false"}
              start={user.lastPosition.z.toString(10)}
              end={user.position.z.toString(10)}
            />
            <m-attr-anim
              attr={"ry"}
              start-time={user.time}
              duration={interval}
              loop={"false"}
              start={user.lastRotation.y.toString(10)}
              end={user.rotation.y.toString(10)}
            />
            <m-cube
              color={user.color}
              collide={"false"}
              width={0.1}
              height={0.1}
              depth={0.5}
            />
            <m-cube
              color={user.color}
              collide={"false"}
              x={-0.055}
              z={0.25}
              width={0.1}
              height={0.1}
              depth={0.25}
              ry={45}
            />
            <m-cube
              color={user.color}
              collide={"false"}
              x={0.055}
              z={0.25}
              width={0.1}
              height={0.1}
              depth={0.25}
              ry={-45}
            />
          </m-group>
        ))}
      </m-group>
    </m-group>
  );
}
