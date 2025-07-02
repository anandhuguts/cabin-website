// components/LittleBoy.js
"use client";
import { useRive } from "@rive-app/react-canvas";

export default function LittleBoy() {
  const { rive, RiveComponent } = useRive({
    src: "/little_boy .riv", // from public folder
    stateMachines: "State Machine 1",
    autoplay: false,
  });

  return (
    <div
      onMouseEnter={() => rive && rive.play()}
      style={{ width: 700, height: 700 }}
    >
      <RiveComponent />
    </div>
  );
}
