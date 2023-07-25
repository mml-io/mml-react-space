import * as React from "react";

import DiscoFloor from "../components/experiences/DiscoFloor";
import DiscoBall from "../components/furniture/DiscoBall";
import BasicRoom from "../components/structures/BasicRoom";
import Stairs from "../components/structures/Stairs";
import SimpleSwitch from "../components/utilis/SimpleSwitch";
import { RoomProps } from "../types";

const width = 17;
const depth = 10;

export default function Disco(props: RoomProps) {
  const [disconOn, setDisconOn] = React.useState(true);

  const toggleDiscoBall = () => {
    setDisconOn(!disconOn);
  };

  return (
    <BasicRoom
      width={width}
      depth={depth}
      ceilingConfig={{
        hasOpening: true,
        openingDepth: 2,
        openingWidth: 5,
        openingPosition: {
          x: 2,
          z: -2,
        },
      }}
      {...props}
      wallConfig={props.wallConfig}
      floorConfig={{
        invisible: disconOn,
        color: "black",
      }}
      hasCeiling
    >
      {props.children}
      <DiscoFloor width={width} depth={depth} visible={disconOn} />
      <DiscoBall y={3.2} z={4} x={-7.5} speed={1} isOn={disconOn} />
      <SimpleSwitch
        y={1.2}
        x={8.35}
        z={1.2}
        onClick={toggleDiscoBall}
        ry={-90}
      />
      <Stairs ry={90} x={-0.4} z={-2} />
    </BasicRoom>
  );
}
