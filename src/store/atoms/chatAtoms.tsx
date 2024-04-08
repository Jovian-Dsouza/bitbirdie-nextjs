import { atom } from "recoil";
import { testSwap, testBrainAsk, testLimitOrder, testGetPrice, testSend} from "@/data/testMessages";

export const messagesAtom = atom({
  key: "messagesAtom",
  default: [],
});

// export const messagesAtom = atom({
//   key: "messagesAtom",
//   default: [testSend, testSwap, testBrainAsk, testLimitOrder, testGetPrice],
// });

// export const messagesAtom = atom({
//   key: "messagesAtom",
//   default: [testSend],
// });