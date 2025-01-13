import { Step } from "@tiptap/pm/transform";
import { atom } from "jotai";

export interface HistoryStep {
  version: number;
  steps: Step[];
  timestamp: number;
}

export interface IBranchData {
  name: string;
  length: number;
  originStep: number;
  originFrom: string;
}

export const wordCountAtom = atom<number>(0);
export const characterCountAtom = atom<number>(0);

export const historyActiveAtom = atom<boolean>(false);
export const editorVersionAtom = atom<number>(0);
export const sliderVersionAtom = atom<number>(0);

export const documentHistoryAtom = atom<Record<string, HistoryStep[]>>({
  main: [],
});

export const currentBranchAtom = atom<string>("main");
export const branchListAtom = atom<IBranchData[]>([
  { name: "main", length: 0, originStep: 0, originFrom: "root" },
]);
