import { MLightElement } from "@mml-io/mml-react-types";
import * as React from "react";
import { useEffect, useRef } from "react";

import { GroupProps } from "../../types";

const POINT_LIGHT_INTENSITY = "5";

export default function Lamp(props: GroupProps) {
  const spotlightRef = useRef<MLightElement>(null);
  const pointLightRef = useRef<MLightElement>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchLight = () => {
    if (!spotlightRef.current) return;

    const light = spotlightRef.current;

    if (light.getAttribute("intensity") === "0") {
      light.setAttribute("intensity", "1");
      intervalRef.current = lightFlickeringInterval();
      if (pointLightRef.current) {
        pointLightRef.current.setAttribute("intensity", POINT_LIGHT_INTENSITY);
      }
    } else {
      light.setAttribute("intensity", "0");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (pointLightRef.current) {
        pointLightRef.current.setAttribute("intensity", "0");
      }
    }
  };

  const lightFlickeringInterval = () =>
    setInterval(() => {
      if (!spotlightRef.current) return;

      const light = spotlightRef.current;

      if (Math.random() > 0.9) {
        light.setAttribute("intensity", (0.5 + Math.random() * 0.5).toString());
      }
    }, 33);

  useEffect(() => {
    if (!spotlightRef.current) return;

    intervalRef.current = lightFlickeringInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <m-group {...props}>
      <m-group>
        <m-cube
          width={0.4}
          depth={0.4}
          height={0.032}
          color="black"
          y={-0.28}
          z={-0.2}
        />
        <m-cube
          width={0.04}
          depth={0.04}
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
          <m-light
            type="spotlight"
            z={-0.08}
            rx={90}
            intensity={0.08}
            color="yellow"
            ref={spotlightRef}
          />
          <m-light
            type="point"
            z={-0.2}
            rx={-90}
            intensity={POINT_LIGHT_INTENSITY}
            distance={0.8}
            color="yellow"
            ref={pointLightRef}
          />
        </m-group>
        <m-group id="shade" y={0.36} z={-0.24} rx={-90}>
          <m-cube
            id="cube1"
            width={0.4}
            height={0.4}
            depth={0.004}
            z={0.2}
            ry={0}
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
