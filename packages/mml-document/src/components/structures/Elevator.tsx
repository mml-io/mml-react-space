import React, { useCallback, useEffect, useRef, useState } from "react";




























  const goUp = useCallback(() => {








  }, [currentFloor, intervalRef, isMoving, props.levels]);

  const moveElevatorTimeout = useCallback(
    () =>
      setTimeout(() => {
        if (!platformRef.current) return;

        const newY = currentFloor.current * height;

        if (yPos.current === newY) {
          setIsMoving(false);
          clearTimeout(intervalRef.current);
          return;
        }

        yPos.current =
          yPos.current < newY
            ? Math.min(yPos.current + 0.1, newY)
            : Math.max(yPos.current - 0.1, newY);

        platformRef.current.setAttribute("y", yPos.current.toString());
        intervalRef.current = moveElevatorTimeout();
      }, 16),
    [yPos, height, currentFloor, platformRef, setIsMoving]
  );











  }, [isMoving, moveElevatorTimeout]);




































