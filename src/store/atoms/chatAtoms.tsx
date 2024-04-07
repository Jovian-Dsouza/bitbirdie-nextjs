import { atom } from "recoil";
import { testGetPrice } from "@/data/testMessages";
export const messagesAtom = atom({
  key: "messagesAtom",
  default: []
});