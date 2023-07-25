import React, { useRef, useState } from "react";

import { GroupProps } from "../../types";
import { CustomElement } from "../../types/declaration";

export default function Dice(props: GroupProps) {
  const [diceResult, setDiceResult] = useState(1);
  const diceRef = useRef<CustomElement<any>>();

  const rollDice = () => {
    if (!diceRef.current) {
      return;
    }

    const lerp = (start: number, end: number, t: number) =>
      start * (1 - t) + end * t;
    const radToDeg = (radians: number) => radians * (180 / Math.PI);

    const rollMap = {
      1: {
        rx: radToDeg(2 * Math.PI),
        ry: 0,
        rz: radToDeg(2 * Math.PI),
      },
      2: {
        rx: radToDeg(2 * Math.PI),
        ry: 0,
        rz: radToDeg(2 * Math.PI - Math.PI / 2),
      },
      3: {
        rx: radToDeg(2 * Math.PI - Math.PI / 2),
        ry: 0,
        rz: radToDeg(2 * Math.PI),
      },
      4: {
        rx: radToDeg(2 * Math.PI + Math.PI / 2),
        ry: 0,
        rz: radToDeg(2 * Math.PI),
      },
      5: {
        rx: radToDeg(2 * Math.PI),
        ry: 0,
        rz: radToDeg(2 * Math.PI + Math.PI / 2),
      },
      6: {
        rx: radToDeg(2 * Math.PI + Math.PI),
        ry: 0,
        rz: radToDeg(2 * Math.PI),
      },
    } as const;

    let newRoll = Math.floor(Math.random() * 6) + 1;
    while (newRoll === diceResult) {
      newRoll = Math.floor(Math.random() * 6) + 1;
    }
    const newDiceResult = newRoll;

    setDiceResult(newDiceResult);

    const targetRotation = rollMap[newDiceResult as keyof typeof rollMap];
    const startRotation = {
      rx: parseFloat(diceRef.current.getAttribute("rx")),
      ry: parseFloat(diceRef.current.getAttribute("ry")),
      rz: parseFloat(diceRef.current.getAttribute("rz")),
    };

    const animationTime = 400;
    const interval = 40;
    let currentTime = 0;

    const intervalId = setInterval(() => {
      if (!diceRef.current) {
        clearInterval(intervalId);
        return;
      }

      currentTime += interval;
      if (currentTime < animationTime) {
        const t = currentTime / animationTime;
        const currentRotation = {
          rx: lerp(startRotation.rx, targetRotation.rx, t),
          ry: lerp(startRotation.ry, targetRotation.ry, t),
          rz: lerp(startRotation.rz, targetRotation.rz, t),
        };
        diceRef.current.setAttribute("rx", currentRotation.rx.toString());
        diceRef.current.setAttribute("ry", currentRotation.ry.toString());
        diceRef.current.setAttribute("rz", currentRotation.rz.toString());
        diceRef.current.setAttribute("y", Math.cos(t * 2.0 - 0.5) * 2.5);
      } else {
        diceRef.current.setAttribute("rx", targetRotation.rx.toString());
        diceRef.current.setAttribute("ry", targetRotation.ry.toString());
        diceRef.current.setAttribute("rz", targetRotation.rz.toString());
        diceRef.current.setAttribute("y", props.y);
        clearInterval(intervalId);
      }
    }, interval);
  };

  return (
    <m-model
      ref={diceRef}
      onClick={rollDice}
      id="dice"
      collide="true"
      collideable="true"
      src="/assets/dice.glb"
      sx="1"
      sy="1"
      sz="1"
      y={props.y ?? 1}
      rx="0"
      ry="0"
      rz="0"
      {...props}
    ></m-model>
  );
}
