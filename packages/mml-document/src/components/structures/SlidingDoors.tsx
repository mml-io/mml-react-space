import React, { useEffect, useState } from "react";












  const [collidingUsers, setCollidingUsers] = useState<Set<number>>(new Set());
  const [currentRatioOpen, setCurrentRatioOpen] = useState(0);

  useEffect(() => {
    const shouldBeOpen = collidingUsers.size > 0;
    let openRatio: number;
    if (shouldBeOpen && currentRatioOpen < 1) {
      openRatio = currentRatioOpen + 0.1;
    } else if (!shouldBeOpen && currentRatioOpen > 0) {
      openRatio = currentRatioOpen - 0.1;
    } else {
      return;

    openRatio = Math.min(Math.max(openRatio, 0), 1);
    const timeout = setTimeout(() => {
      setCurrentRatioOpen(openRatio);
    }, 50);

      clearTimeout(timeout);

  }, [collidingUsers, currentRatioOpen]);








        x={-props.width / 4 - 0.001 - (currentRatioOpen * props.width) / 2}









        x={props.width / 4 + 0.001 + (currentRatioOpen * props.width) / 2}








        depth={5}




        collision-interval="500"
        ref={(el: CustomElement<any>) => {
          if (!el) {
            return;
          }
          el.addEventListener("collisionstart", (event: CustomEvent) => {
            const { connectionId } = event.detail;
            setCollidingUsers(
              new Set(Array.from(collidingUsers).concat([connectionId]))
            );
          });
          el.addEventListener("collisionend", (event: CustomEvent) => {
            const { connectionId } = event.detail;
            const newSet = new Set(Array.from(collidingUsers));
            newSet.delete(connectionId);
            setCollidingUsers(newSet);
          });
        }}




