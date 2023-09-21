import * as React from "react";

import { GroupProps } from "../../types";

type SimpleSwitchProps = GroupProps & {
  onClick: () => void;
  color?: string;
};

export default function SimpleSwitch({
  onClick,
  color = "red",
  ...groupProps
}: SimpleSwitchProps) {
  return (
    <m-group onClick={onClick} {...groupProps}>
      <m-cube height={0.35} depth={0.01} width={0.35} color="black" />
      <m-cylinder
        height={0.01}
        radius={0.1}
        color={color}
        rz={90}
        ry={90}
        z={0.01}
      />
    </m-group>
  );
}
