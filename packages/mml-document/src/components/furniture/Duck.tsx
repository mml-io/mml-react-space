import React, { useEffect, useState } from "react";

import { GroupProps } from "../../types";

export default function Duck(props: GroupProps) {
  const [r, setR] = useState(0);

  useEffect(() => {
    function rotateDuck() {
      setR((oldR) => oldR + 45);
    }

    const interval = setInterval(() => {
      rotateDuck();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <m-model
      id="duck"
      src="/assets/duck.glb"
      rx="180"
      rz="180"
      sx="2"
      sy="2"
      sz="2"
      y="0"
      ry={r}
      z="0"
      x="0"
      collide="true"
      {...props}
    ></m-model>
  );
}
