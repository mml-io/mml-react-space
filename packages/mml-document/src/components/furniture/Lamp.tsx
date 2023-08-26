import * as React from "react";
import { useCallback } from "react";

import { GroupProps } from "../../types";

export default function Lamp(props: GroupProps) {
  const [lightOn, setLightOn] = React.useState(true);

  const switchLight = useCallback(() => {
    setLightOn(!lightOn);
  }, [lightOn]);

  return (
    <m-group {...props}>
      <m-group>
        <m-cube
          width={0.4}
          depth={0.4}
          height={0.032}
          color="#999"
          y={-0.28}
          z={-0.2}
        />
        <m-cube
          width={0.1}
          depth={0.1}
          height={0.032}
          color="red"
          y={-0.244}
          z={-0.28}
          onClick={switchLight}
        />
      </m-group>
      <m-group rx={20}>
        <m-cylinder radius={0.04} height={0.6} color="black" />
        <m-sphere radius={0.04} y={0.34} color="gray" />
      </m-group>
      <m-group rx={-50} y={0.54} z={-0.14}>
        <m-cylinder radius={0.04} height={0.6} color="black" />
        <m-sphere radius={0.04} y={0.34} color="gray" />
        <m-cube
          width={0.08}
          height={0.08}
          depth={0.08}
          y={0.34}
          z={-0.08}
          color="black"
        />
        <m-group y={0.34} z={-0.172}>
          <m-sphere radius={0.08} color="yellow" />
          {lightOn && (
            <>
              <m-light
                type="spotlight"
                z={-0.08}
                rx={90}
                intensity={0.5}
                color="yellow"
              />
              <m-light type="point" z={-0.08} intensity={0.25} color="yellow" />
            </>
          )}
        </m-group>
        <m-group id="shade" y={0.36} z={-0.24} rx={-90}>
          <m-cube
            id="cube1"
            width={0.4}
            height={0.4}
            depth={0.004}
            z={0.2}
            color="white"
          />
          <m-cube
            id="cube2"
            width={0.4}
            height={0.4}
            depth={0.004}
            z={-0.2}
            ry={180}
            color="white"
          />
          <m-cube
            id="cube3"
            width={0.4}
            height={0.4}
            depth={0.004}
            x={0.2}
            ry={90}
            color="white"
          />
          <m-cube
            id="cube4"
            width={0.4}
            height={0.4}
            depth={0.004}
            x={-0.2}
            ry={-90}
            color="white"
          />
        </m-group>
      </m-group>
    </m-group>
  );
}
