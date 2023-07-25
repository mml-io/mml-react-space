import React, { useEffect, useState } from "react";

import { GroupProps } from "../../types";
import SimpleSwitch from "../utilis/SimpleSwitch";

type ImageProps = GroupProps & {
  src: string | string[];
  width?: number;
  height?: number;
  buttonsPosition?: number;
  slideShow?: boolean;
  slideshowTime?: number;
};

export default function MMLImage({
  src,
  width = 0,
  height = 0,
  buttonsPosition = 0,
  slideShow,
  slideshowTime = 2000,
  ...rest
}: ImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isCarousel = Array.isArray(src);
  const currentImage = isCarousel ? src[currentImageIndex] : src;

  const handleClick = (prev = false) => {
    if (!isCarousel) return;

    setCurrentImageIndex(
      (i) => (i + (prev ? -1 : 1) + src.length) % src.length
    );
  };

  useEffect(() => {
    if (!slideShow) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((i) => (i + 1) % src.length);
    }, slideshowTime);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <m-group {...rest}>
      <m-image src={currentImage} width={width} height={height} />
      {isCarousel && !slideShow && (
        <m-group z={0.01} y={buttonsPosition || -(height ?? 1) / 2 - 0.1}>
          <SimpleSwitch x={-0.05} onClick={() => handleClick(true)} />
          <SimpleSwitch x={0.05} onClick={() => handleClick()} />
        </m-group>
      )}
    </m-group>
  );
}
