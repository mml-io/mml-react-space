import React, { useEffect, useState } from "react";

import { GroupProps } from "../../types";

type StairsProps = GroupProps & {
  numStairs?: number;
  totalHeight?: number;
  totalWidth?: number;
  stairDepth?: number;
  filled?: boolean;
};

type Stair = {
  z: number;
  y: number;
  width: number;
  height: number;
  depth: number;
};

export default function Stairs({
  numStairs = 15,
  totalHeight = 4,
  totalWidth = 5,
  stairDepth = 1.5,
  filled = false,
  ...props
}: StairsProps) {
  const [stairs, setStairs] = useState<Stair[]>([]);

  useEffect(() => {
    const stairHeight = totalHeight / numStairs;
    const stairWidth = totalWidth / numStairs;
    const newStairs: Stair[] = [];

    Array.from({ length: numStairs }).forEach((_, i) => {
      const stairConfig = {
        z: i * stairWidth,
        y: i * stairHeight + stairHeight / 2,
        width: stairDepth,
        height: stairHeight,
        depth: 0.5,
      };

      newStairs.push(stairConfig);

      // If filled, add additional stairs beneath the current stair
      if (filled) {
        for (let j = 0; j < i; j++) {
          newStairs.push({
            ...stairConfig,
            y: j * stairHeight + stairHeight / 2,
          });
        }
      }
    });

    setStairs(newStairs);
  }, [numStairs, totalHeight, totalWidth, stairDepth, filled]);

  return (
    <m-group {...props}>
      {stairs.map((stair, i) => (
        <m-cube
          key={i}
          y={stair.y}
          z={stair.z}
          width={stair.width}
          height={stair.height}
          depth={stair.depth}
          collide
        />
      ))}
    </m-group>
  );
}
