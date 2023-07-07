import { ObjectId } from "mongodb";
import { GameLocation, GameLocationsEnum } from "./gameLocation";
import { GameStatusEnum } from "./GameStatusEnum";

export type Game = {
  _id: ObjectId;
  players: Player[];
  status: GameStatusEnum;
  createdAt: Date;
  location: GameLocationsEnum;
  spy?: string; // Player id
};
