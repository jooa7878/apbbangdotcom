import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export enum Races {
  "Protoss" = "Protoss",
  "Terran" = "Terran",
  "Zerg" = "Zerg",
}

export interface IMatch {
  createdAt: number;
  id: string;
  loser: {
    loser: string;
    loserRace: string;
  };
  winner: {
    winner: string;
    winnerRace: string;
  };
  map: string;
  date: Timestamp;
}

export const matchState = atom<IMatch[]>({
  key: "match",
  default: [],
});
