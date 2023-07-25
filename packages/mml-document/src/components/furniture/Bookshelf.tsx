import * as React from "react";

import { GroupProps } from "../../types";

export default function Bookshelf(props: GroupProps) {
  // Define the number of shelves and books
  const shelves = 4;
  const booksPerShelf = 4;
  const bookWidth = 0.05;
  const shelfWidth = 1;
  const shelfSpacing = 0.005; // gap between books

  // Generate shelves
  const shelfElements = [...Array(shelves)].map((_, i) => (
    <m-cube
      key={`shelf${i}`}
      id={`shelf${i}`}
      width="1"
      height="0.02"
      depth="0.4"
      y={i * 0.45}
      color="rgba(84, 64, 42, 1)"
    />
  ));

  // Function to generate non-overlapping random book positions
  const generateBookPositions = () => {
    const positions: number[] = [];
    while (positions.length < booksPerShelf) {
      const newBookX =
        Math.random() * (shelfWidth - bookWidth * 2) -
        (shelfWidth - bookWidth * 3) / 2; // random X within shelf
      if (
        positions.every(
          (x) => Math.abs(newBookX - x) > bookWidth + shelfSpacing
        )
      ) {
        // check for overlap
        positions.push(newBookX);
      }
    }
    return positions;
  };

  // Generate books with random non-overlapping x positions
  const bookElements = [...Array(shelves)].flatMap((_, i) =>
    generateBookPositions().map((bookX, j) => (
      <m-cube
        key={`book${i}${j}`}
        id={`book${i}${j}`}
        width="0.05"
        height="0.35"
        depth="0.2"
        x={bookX}
        y={i * 0.45 + 0.185} // Place book on shelf
        color={["red", "green", "blue", "yellow", "purple"][j % 5]} // Rotate colors
      />
    ))
  );

  return (
    <m-group id="bookshelf" {...props}>
      <m-cube
        id="left"
        width="0.05"
        height={1.8}
        depth="0.4"
        x="-0.52"
        y={0.9}
        color="rgba(84, 64, 42, 1)"
        collide={true}
      />
      <m-cube
        id="right"
        width="0.05"
        height={1.8}
        depth="0.4"
        x="0.52"
        y={0.9}
        color="rgba(84, 64, 42, 1)"
        collide={true}
      />
      <m-cube
        id="top"
        width="1"
        height="0.02"
        depth="0.4"
        y={1.79}
        color="rgba(84, 64, 42, 1)"
        collide={true}
      />

      <m-group id="shelves">{shelfElements}</m-group>
      <m-group id="books">{bookElements}</m-group>
    </m-group>
  );
}
