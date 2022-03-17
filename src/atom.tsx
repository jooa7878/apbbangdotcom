import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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
  date: string;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: IMatch[]) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const matchState = atom<IMatch[]>({
  key: "match",
  default: [],
  effects_UNSTABLE: [localStorageEffect("matchHistory")],
});

export const loginState = atom({
  key: "islogin",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isLogin")],
});
