import React, { useEffect, useRef, useState } from "react";

import { GroupProps } from "../../types";
import { CustomElement } from "../../types/declaration";

type Player = "X" | "O";
type CollisionEvent = Event & { detail: any };

export default function TicTacToe(props: GroupProps) {
  const [players, setPlayers] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [labelText, setLabelText] = useState("Tic Tac Toe!!!");
  const [fontSize, setFontSize] = useState(28);
  const player1CubeRef = useRef<CustomElement<any>>();
  const player2CubeRef = useRef<CustomElement<any>>();

  const hasPlayers = players[0] !== null && players[1] !== null;

  function updateBoard(x: number, y: number, player: Player) {
    const newBoard = [...board];
    newBoard[y][x] = player;
    setBoard((board) => {
      board[y][x] = player;
      return board;
    });
    return newBoard;
  }

  function checkForWin(newBoard: string[][]) {
    const winConditions = [
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ], // rows
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // columns
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ], // diagonals
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    return winConditions.some((condition) =>
      condition.every(([x, y]) => newBoard[y][x] === currentPlayer)
    );
  }

  function restart() {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setLabelText("Tic Tac Toe!!!");
    setCurrentPlayer("X");
    setFontSize(28);
  }

  function checkTie() {
    return board.every((row) => row.every((cell) => cell !== ""));
  }

  function selectCell(x: number, y: number, e: CollisionEvent) {
    if (!hasPlayers) return;

    const { connectionId } = e.detail;

    if (players[0] !== connectionId && currentPlayer === "X") return;
    if (players[1] !== connectionId && currentPlayer === "O") return;

    if (board[y][x] === "") {
      // Update board status
      const newBoard = updateBoard(x, y, currentPlayer);

      // Check for win
      if (checkForWin(newBoard)) {
        setFontSize(18);
        setLabelText(`Player ${currentPlayer} wins!\nClick here to restart...`);
        return;
      }
      const newPlayer = currentPlayer === "X" ? "O" : "X";
      // Switch players
      setCurrentPlayer(newPlayer);

      if (checkTie()) {
        setFontSize(18);
        setLabelText(`It's a tie!\nClick here to restart...`);
        return;
      }

      setLabelText(`${newPlayer}'s turn!`);
    }
  }

  useEffect(() => {
    const player1Cube = player1CubeRef.current;
    const player2Cube = player2CubeRef.current;

    function onCubeCollision(e: CollisionEvent, player: 1 | 2) {
      if (hasPlayers) return;

      const { connectionId } = e.detail;

      if (player === 1) {
        setPlayers((oldPlayers) => {
          if (oldPlayers[0]) return oldPlayers;

          if (oldPlayers[1]) setLabelText(`${currentPlayer}'s turn!`);

          return [connectionId, oldPlayers[1]];
        });
      } else if (!players[1] && player === 2) {
        setPlayers((oldPlayers) => {
          if (oldPlayers[1]) return oldPlayers;

          if (oldPlayers[0]) setLabelText(`${currentPlayer}'s turn!`);

          return [oldPlayers[0], connectionId];
        });
      }
    }

    function onCubeLeave(e: CollisionEvent, player: 1 | 2) {
      const { connectionId } = e.detail;

      if (player === 1) {
        setPlayers((oldPlayers) => {
          if (oldPlayers[0] === connectionId) {
            restart();
            return [null, oldPlayers[1]];
          }

          return oldPlayers;
        });
      } else if (player === 2) {
        setPlayers((oldPlayers) => {
          if (oldPlayers[1] === connectionId) {
            restart();
            return [oldPlayers[0], null];
          }

          return oldPlayers;
        });
      }
    }

    player1Cube?.addEventListener("collisionstart", (e: CollisionEvent) => {
      onCubeCollision(e, 1);
    });
    player1Cube?.addEventListener("collisionend", (e: CollisionEvent) => {
      onCubeLeave(e, 1);
    });

    player2Cube?.addEventListener("collisionstart", (e: CollisionEvent) => {
      onCubeCollision(e, 2);
    });

    player2Cube?.addEventListener("collisionend", (e: CollisionEvent) => {
      onCubeLeave(e, 2);
    });

    return () => {
      player1Cube?.removeEventListener("collisionenter", () => onCubeCollision);
      player1Cube?.removeEventListener("collisionleave", () => onCubeLeave);
      player2Cube?.removeEventListener("collisionenter", () => onCubeCollision);
      player2Cube?.removeEventListener("collisionleave", () => onCubeLeave);
    };
  }, [currentPlayer, hasPlayers, players]);

  return (
    <m-group id="tictactoe" {...props}>
      <m-label
        id="winner"
        width="2"
        y="-0.3"
        height="0.5"
        font-size={fontSize}
        alignment="center"
        content={labelText}
        padding={0}
        onClick={restart}
      ></m-label>
      <m-cube
        id="line-horizontal-1"
        width="2"
        height="2"
        depth="0.009"
        z="0"
        y="0.981"
        color="black"
      ></m-cube>
      <m-label
        id="cell-1"
        width="0.6"
        height="0.6"
        x="-0.636"
        y="1.636"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(0, 0, e)}
        content={board[0][0]}
      ></m-label>
      <m-label
        id="cell-2"
        width="0.6"
        height="0.6"
        x="0"
        y="1.636"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(1, 0, e)}
        content={board[0][1]}
      ></m-label>
      <m-label
        id="cell-3"
        width="0.6"
        height="0.6"
        x="0.636"
        y="1.636"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(2, 0, e)}
        content={board[0][2]}
      ></m-label>
      <m-label
        id="cell-4"
        width="0.6"
        height="0.6"
        x="-0.636"
        y="1"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(0, 1, e)}
        content={board[1][0]}
      ></m-label>
      <m-label
        id="cell-5"
        width="0.6"
        height="0.6"
        x="0"
        y="1"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(1, 1, e)}
        content={board[1][1]}
      ></m-label>
      <m-label
        id="cell-6"
        width="0.6"
        height="0.6"
        x="0.636"
        y="1"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(2, 1, e)}
        content={board[1][2]}
      ></m-label>
      <m-label
        id="cell-7"
        width="0.6"
        height="0.6"
        x="-0.636"
        y="0.36"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(0, 2, e)}
        content={board[2][0]}
      ></m-label>
      <m-label
        id="cell-8"
        width="0.6"
        height="0.6"
        x="0"
        y="0.36"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(1, 2, e)}
        content={board[2][1]}
      ></m-label>
      <m-label
        id="cell-9"
        width="0.6"
        height="0.6"
        x="0.636"
        y="0.36"
        z="0.009"
        font-size="36"
        color="#ffffff"
        alignment="center"
        padding={0}
        onClick={(e: CollisionEvent) => selectCell(2, 2, e)}
        content={board[2][2]}
      ></m-label>
      <m-label
        y="-1.43"
        z={1.5}
        x={-1.5}
        color="red"
        rx={90}
        content="X"
        alignment="center"
        font-size={80}
        padding={0}
        collide={false}
      ></m-label>
      <m-cube
        y="-1.49"
        z={1.5}
        x={-1.5}
        height={0.1}
        color="red"
        id="collision-cube-1"
        collision-interval="1000"
        ref={player1CubeRef}
      ></m-cube>
      <m-label
        y="-1.43"
        z={1.5}
        x={1.5}
        color="red"
        rx={90}
        content="O"
        alignment="center"
        font-size={80}
        padding={0}
        collide={false}
      />
      <m-cube
        y="-1.49"
        z={1.5}
        x={1.5}
        height={0.1}
        color="red"
        id="collision-cube-2"
        collision-interval="1000"
        ref={player2CubeRef}
      ></m-cube>
    </m-group>
  );
}
