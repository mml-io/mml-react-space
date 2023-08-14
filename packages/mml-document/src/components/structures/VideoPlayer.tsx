import React, { useMemo, useRef } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const id = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  const {
    src,
    width = 3,
    height = width * 0.5625,
    controls,
    controlColor,
    loop,
    ...rest
  } = props;

  function restart() {
    const video = videoRef.current;

    video?.setAttribute(
      "pause-time",
      (document.timeline.currentTime ?? 0).toString()
    );
    video?.setAttribute(
      "start-time",
      (document.timeline.currentTime ?? 0).toString()
    );
    video?.removeAttribute("pause-time");
  }

  function toggleEnabled() {
    const video = videoRef.current;

    const enabled = video?.getAttribute("enabled") !== "false";
    video?.setAttribute("enabled", (!enabled).toString());
  }

  function pause() {
    const video = videoRef.current;

    if (video?.hasAttribute("pause-time")) return;

    video?.setAttribute(
      "pause-time",
      (document.timeline.currentTime ?? 0).toString()
    );
  }

  function unpause() {
    const video = videoRef.current;

    video?.removeAttribute("pause-time");
  }

  function resume() {
    const video = videoRef.current;

    if (!video?.hasAttribute("pause-time")) return;
    const startTime = parseFloat(video?.getAttribute("start-time") as string);

    const pauseTime = parseFloat(video?.getAttribute("pause-time") as string);

    const playedDuration = pauseTime - startTime;
    const newStartTime =
      (document.timeline.currentTime as number) - playedDuration;
    video?.removeAttribute("pause-time");
    video?.setAttribute("start-time", newStartTime.toString());
  }

  return (
    <m-group {...rest}>
      <m-video
        width={width}
        height={height}
        start-time="0"
        loop={loop}
        src={src}
        y={height}
        id={id}
        ref={videoRef}
        volume={0}
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
              x="0"
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
