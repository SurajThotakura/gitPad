import { characterCountAtom, wordCountAtom } from "@/state/atoms";
import { useAtomValue } from "jotai";

export const CounterDisplay = () => {
  const wordCount = useAtomValue(wordCountAtom);
  const charCount = useAtomValue(characterCountAtom);
  return (
    <div className="flex flex-col items-end border-r-2 px-4 ">
      <div className="text-sm font-bold">{wordCount} Words</div>
      <div className="text-sm text-stone-500">{charCount} Characters</div>
    </div>
  );
};
