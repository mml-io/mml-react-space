import * as React from "react";

import { Position } from "../../types";

type ColumnProps = Position;

export default function Column(props: ColumnProps) {
  return (
    <m-group {...props}>
      <m-cube color="white" width={0.8} height={0.125} depth={0.8} y={1.43} />
      <m-cube color="white" width={0.6} height={0.125} depth={0.6} y={1.3} />
      <m-cylinder color="white" radius={0.3} height={2.5} />
      <m-cube color="white" width={0.6} height={0.125} depth={0.6} y={-1.3} />
      <m-cube color="white" width={0.8} height={0.125} depth={0.8} y={-1.43} />
    </m-group>
  );
}
