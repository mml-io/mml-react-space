import React, { useState } from "react";

import { GroupProps } from "../../types";

type VideoProps = {
  src: string;
  loop?: boolean;
  controls?: boolean;
  controlColor?: string;
  width?: number;
  height?: number;
  fontSize?: number;
} & GroupProps;

export default function VideoPlayer(props: VideoProps) {
  const {
    src,
    width = 3,
    height = width * 0.5625,
    controls,
    controlColor,
    loop,
    ...rest
  } = props;

  const [enabled, setEnabled] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [pauseTime, setPauseTime] = useState<number | null>(null);

  function restart() {
    setStartTime(document.timeline.currentTime as number);
    setPauseTime(null);
  }

  function toggleEnabled() {
    setEnabled(!enabled);
  }

  function pause() {
    if (!enabled) return;
    if (pauseTime !== null) return;
    setPauseTime(document.timeline.currentTime as number);
  }

  function unpause() {
    setPauseTime(null);
  }

  function resume() {
    if (!enabled) return;
    if (pauseTime === null) return;
    const playedDuration = pauseTime - startTime;
    const newStartTime =
      (document.timeline.currentTime as number) - playedDuration;
    setStartTime(newStartTime);
    setPauseTime(null);
  }

  return (
    <m-group {...rest}>
      <m-video
        width={width}
        height={height}
        loop={loop ? "true" : "false"}
        src={src}
        y={height}
        volume={0}
        start-time={startTime}
        pause-time={pauseTime ?? undefined}
        enabled={enabled}
      >
        {controls && (
          <m-group y={-height / 2 - height * 0.18}>
            <m-label
              content="restart"
              x={width / 5 + width * 0.18 + width * 0.02}
              font-size={width * 4}
              width={width * 0.18}
              alignment="left"
              height={height * 0.18}
              color={controlColor}
              onClick={restart}
            ></m-label>
            <m-label
              content="pause"
              x={-width / 5 - width * 0.18 - width * 0.02}
              font-size={width * 4}
              width={width * 0.18}
              alignment="left"
              height={height * 0.18}
              color={controlColor}
              onClick={pause}
            ></m-label>
            <m-label
              content="unpause"
              x={(-width / 5) * 2 + width * 0.18 + width * 0.02}
              font-size={width * 4}
              width={width * 0.18}
              alignment="left"
              height={height * 0.18}
              color={controlColor}
              onClick={unpause}
            ></m-label>
            <m-label
              content="resume"
              x={(width / 5) * 2 - width * 0.18 - width * 0.02}
              font-size={width * 4}
              width={width * 0.18}
              alignment="left"
              height={height * 0.18}
              color={controlColor}
              onClick={resume}
            ></m-label>
            <m-label
              content="enable"
              font-size={width * 4}
              width={width * 0.18}
              alignment="left"
              height={height * 0.18}
              color={controlColor}
              onClick={toggleEnabled}
            ></m-label>
          </m-group>
        )}
      </m-video>
    </m-group>
  );
}
