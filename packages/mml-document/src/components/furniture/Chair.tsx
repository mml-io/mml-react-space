import * as React from "react";

import { GroupProps } from "../../types";

export default function Chair(props: GroupProps) {
  return (
    <m-group id="chair" {...props}>
      <m-cube
        id="seat"
        width="0.6"
        height="0.1"
        depth="0.6"
        y="0.5"
        color="brown"
        collide={true}
      ></m-cube>
      <m-cube
        id="leg-1"
        width="0.1"
        height="0.5"
        depth="0.1"
        x="-0.25"
        y="0.25"
        z="0.25"
        color="brown"
      ></m-cube>
      <m-cube
        id="leg-2"
        width="0.1"
        height="0.5"
        depth="0.1"
        x="0.25"
        y="0.25"
        z="0.25"
        color="brown"
      ></m-cube>
      <m-cube
        id="leg-3"
        width="0.1"
        height="0.5"
        depth="0.1"
        x="-0.25"
        y="0.25"
        z="-0.25"
        color="brown"
      ></m-cube>
      <m-cube
        id="leg-4"
        width="0.1"
        height="0.5"
        depth="0.1"
        x="0.25"
        y="0.25"
        z="-0.25"
        color="brown"
      ></m-cube>
      <m-cube
        id="back"
        width="0.6"
        height="0.6"
        depth="0.1"
        y="0.85"
        z="-0.25"
        color="brown"
        collide={true}
      ></m-cube>
    </m-group>
  );
}
