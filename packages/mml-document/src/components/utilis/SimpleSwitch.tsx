import * as React from "react";

import { GroupProps } from "../../types";

type SimpleSwitchProps = GroupProps & {
  onClick: () => void;
};

export default function SimpleSwitch({
  onClick,
  ...groupProps
}: SimpleSwitchProps) {
  return (
    <m-group onClick={onClick} {...groupProps}>
      <m-cube height={0.075} depth={0.01} width={0.075} color="black" collide />
      <m-cylinder
        height={0.01}
        radius={0.01}
        color="red"
        rz={90}
        ry={90}
        z={0.01}
        collide
      />
    </m-group>
  );
}
