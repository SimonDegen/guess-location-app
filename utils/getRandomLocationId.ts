import { GameLocationsEnum } from "@/types/gameLocation";

export default function getRandomLocationIdFromEnum(): GameLocationsEnum {
  const index = Math.floor(
    Math.random() * Object.keys(GameLocationsEnum).length
  );
  const value = Object.keys(GameLocationsEnum)[index];
  return GameLocationsEnum[value as keyof typeof GameLocationsEnum];
}
