import * as React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

import Elevator from "./components/structures/Elevator";
import FirstFloor from "./floors/FirstFloor";
import GroundFloor from "./floors/GroundFloor";
import SecondFloor from "./floors/SecondFloor";

function App() {
  return (
    <m-group ry={180} z={10}>
      <GroundFloor />
      <FirstFloor />
      <SecondFloor />
      <Elevator levels={3} x={-23.9} z={2} ry={90} />
    </m-group>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById("root")!;
const root = createRoot(container);
flushSync(() => {
  root.render(<App />);
});
