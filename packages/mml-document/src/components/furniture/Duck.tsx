import React from "react";

import { GroupProps } from "../../types";

export default function Duck(props: GroupProps) {
  return (
    <m-model id="duck" src="/assets/duck.glb" sx={2} sy={2} sz={2} {...props}>
      <m-attr-anim
        attr="ry"
        start={(0).toString(10)}
        end={(360).toString(10)}
        duration={10000}
      />
    </m-model>
  );
}
