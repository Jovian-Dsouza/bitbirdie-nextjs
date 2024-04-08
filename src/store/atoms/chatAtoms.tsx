import { atom } from "recoil";
import { testSwap, testBrainAsk, testLimitOrder, testGetPrice} from "@/data/testMessages";
export const messagesAtom = atom({
  key: "messagesAtom",
  default: [],
});

// export const messagesAtom = atom({
//   key: "messagesAtom",
//   default: [testSwap, testBrainAsk, testLimitOrder, testGetPrice],
// });