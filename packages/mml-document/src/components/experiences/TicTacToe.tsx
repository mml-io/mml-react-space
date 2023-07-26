import React, { useCallback, useEffect, useRef, useState } from "react";

import { GroupProps } from "../../types";
import { CustomElement } from "../../types/declaration";
import { EventHandlerCollection } from "../utilis/EventHandlerCollection";

type Player = "X" | "O";
type ClickEvent = Event & { detail: { connectionId: number } };
type CollisionEvent = Event & { detail: { connectionId: number } };

function checkForWin(board: string[]): Player | null {
  const winConditions = [
    [[0], [3], [6]],
    [[1], [4], [7]],
    [[2], [5], [8]],
    [[0], [1], [2]],
    [[3], [4], [5]],
    [[6], [7], [8]],
    [[0], [4], [8]],
    [[2], [4], [6]],
  ];

  if (winConditions.some((c) => c.every(([index]) => board[index] === "X"))) {
    return "X";
  }
  if (winConditions.some((c) => c.every(([index]) => board[index] === "O"))) {
    return "O";
  }
  return null;
}

function createEmptyBoard(): Array<Player | ""> {
  return ["", "", "", "", "", "", "", "", ""];
}

export default function TicTacToe(props: GroupProps) {
  const [playerX, setPlayerX] = useState<number | null>(null);
  const [playerO, setPlayerO] = useState<number | null>(null);
  const [board, setBoard] = useState(() => createEmptyBoard());
  const playerXPad = useRef<CustomElement<any>>(null);
  const playerOPad = useRef<CustomElement<any>>(null);

  // Count the number of X in the board
  const xCount = board.filter((cell) => cell === "X").length;
  // Count the number of O in the board
  const oCount = board.filter((cell) => cell === "O").length;
  const currentPlayer: Player = xCount > oCount ? "O" : "X";

  function restart() {
    setBoard(createEmptyBoard());
  }

  function selectCell(x: number, y: number, e: ClickEvent) {
    const { connectionId } = e.detail;

    if (playerX === null || playerO === null) {
      // We don't have two players yet
      return;
    }
    if (playerX !== connectionId && playerO !== connectionId) {
      // This user isn't one of the players
      return;
    }
    if (playerX === connectionId && currentPlayer !== "X") {
      // This user is player X, but it's not their turn
      return;
    }
    if (playerO === connectionId && currentPlayer !== "O") {
      // This user is player O, but it's not their turn
      return;
    }

    const cellIndex = y * 3 + x;
    if (board[cellIndex] === "") {
      const newBoard = [...board];
      newBoard[cellIndex] = currentPlayer;
      setBoard(newBoard);
    }
  }

  const onPlayerPadCollision = useCallback(
    (e: CollisionEvent, player: Player) => {
      const { connectionId } = e.detail;
      if (player === "X" && playerX === null) {
        setPlayerX(connectionId);
      } else if (player === "O" && playerO === null) {
        setPlayerO(connectionId);
      }
    },
    [playerX, playerO]
  );

  const handlePadLeaveOrDisconnect = useCallback(
    (event: any) => {
      const { connectionId } = event.detail;
      if (connectionId === playerX) {
        setPlayerX(null);
        restart();
      } else if (connectionId === playerO) {
        setPlayerO(null);
        restart();
      }
    },
    [playerX, playerO]
  );

  useEffect(() => {
    if (!playerXPad.current || !playerOPad.current) {
      return;
    }
    const eventHandlerCollection = new EventHandlerCollection();
    eventHandlerCollection.add(
      playerXPad.current as EventTarget,
      "collisionstart",
      (e: CollisionEvent) => {
        onPlayerPadCollision(e, "X");
      }
    );
    eventHandlerCollection.add(
      playerXPad.current as EventTarget,
      "collisionmove",
      (e: CollisionEvent) => {
        onPlayerPadCollision(e, "X");
      }
    );
    eventHandlerCollection.add(
      playerXPad.current as EventTarget,
      "collisionend",
      (e: CollisionEvent) => {
        handlePadLeaveOrDisconnect(e);
      }
    );

    eventHandlerCollection.add(
      playerOPad.current as EventTarget,
      "collisionstart",
      (e: CollisionEvent) => {
        onPlayerPadCollision(e, "O");
      }
    );
    eventHandlerCollection.add(
      playerOPad.current as EventTarget,
      "collisionmove",
      (e: CollisionEvent) => {
        onPlayerPadCollision(e, "O");
      }
    );
    eventHandlerCollection.add(
      playerOPad.current as EventTarget,
      "collisionend",
      (e: CollisionEvent) => {
        handlePadLeaveOrDisconnect(e);
      }
    );

    eventHandlerCollection.add(
      window,
      "disconnected",
      handlePadLeaveOrDisconnect
    );
    return () => {
      eventHandlerCollection.clear();
    };
  }, [
    playerXPad,
    playerOPad,
    onPlayerPadCollision,
    handlePadLeaveOrDisconnect,
  ]);

  let labelText = "Tic Tac Toe!";
  let fontSize = 28;
  let canRestart = false;
  const winner = checkForWin(board);
  if (winner !== null) {
    labelText = `Player ${winner} wins!\nClick here to restart...`;
    canRestart = true;
    fontSize = 18;
  } else if (board.every((cell) => cell !== "")) {
    fontSize = 18;
    canRestart = true;
    labelText = `It's a tie!\nClick here to restart...`;
  } else if (playerX !== null && playerO !== null) {
    if (currentPlayer === "X") {
      labelText = "Player X's turn";
    } else {
      labelText = "Player O's turn";
    }
  }

  return (
    <m-group id="tictactoe" {...props}>
      <m-label
        id="status-label"
        width={2}
        y={-0.3}
        height={0.5}
        font-size={fontSize}
        alignment="center"
        content={labelText}
        padding={0}
        onClick={(e: ClickEvent) => {
          const { connectionId } = e.detail;
          if (
            canRestart &&
            (connectionId === playerX || connectionId === playerO)
          ) {
            restart();
          }
        }}
      ></m-label>
      <m-cube
        id="board-background"
        width={2}
        height={2}
        depth={0.01}
        y={0.981}
        color="black"
      ></m-cube>
      {[0, 1, 2].map((x) =>
        [0, 1, 2].map((y) => {
          const index = y * 3 + x;
          return (
            <m-label
              key={index}
              width={0.6}
              height={0.6}
              font-size={36}
              alignment="center"
              padding={0}
              x={(x - 1) * 0.636}
              y={1 + (y - 1) * -0.636}
              z={0.01}
              color="white"
              onClick={(e: ClickEvent) => selectCell(x, y, e)}
              content={board[index]}
            />
          );
        })
      )}
      <m-label
        x={-1.5}
        y={-1.43}
        z={1.5}
        rx={90}
        color="red"
        content="X"
        alignment="center"
        font-size={80}
        padding={0}
        collide={false}
      ></m-label>
      <m-cube
        x={-1.5}
        y={-1.49}
        z={1.5}
        height={0.1}
        color="red"
        id="player-x-cube"
        collision-interval={1000}
        ref={playerXPad}
      ></m-cube>
      <m-label
        x={1.5}
        y={-1.43}
        z={1.5}
        color="red"
        rx={90}
        content="O"
        alignment="center"
        font-size={80}
        padding={0}
        collide={false}
      />
      <m-cube
        x={1.5}
        y={-1.49}
        z={1.5}
        height={0.1}
        color="red"
        id="player-o-cube"
        collision-interval={1000}
        ref={playerOPad}
      ></m-cube>
    </m-group>
  );
}
