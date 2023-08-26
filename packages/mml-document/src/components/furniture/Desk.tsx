import * as React from "react";

import { GroupProps } from "../../types";

type DeskProps = GroupProps & {
  color?: string;
};

const Leg = (props: DeskProps) => (
  <m-cube
    width={0.05}
    height={0.8}
    depth={0.05}
    x={props.x}
    y={0.4}
    z={props.z}
    color={props.color || "rgba(133, 94, 66, 1)"}
  />
);

export default function Desk(props: DeskProps) {
  return (
    <m-group id="desk" {...props}>
      <m-cube
        id="surface"
        width={1.6}
        height={0.02}
        depth={0.8}
        y={0.8}
        color={props.color || "rgba(133, 94, 66, 1)"}
      />

      <Leg color={props.color} x={0.7} z={0.3} />
      <Leg color={props.color} x={0.7} z={-0.3} />
      <Leg color={props.color} x={-0.7} z={0.3} />
      <Leg color={props.color} x={-0.7} z={-0.3} />
    </m-group>
  );
}
