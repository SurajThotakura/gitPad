import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  branchListAtom,
  currentBranchAtom,
  editorVersionAtom,
  historyActiveAtom,
  sliderVersionAtom,
} from "@/state/atoms";
import { useDocumentHistory } from "@/state/historyStateHook";
import { useAtom, useAtomValue } from "jotai";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  GitBranch,
  GitGraph,
} from "lucide-react";
import { useEffect } from "react";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GitGraphWrapper } from "./GitGraphWrapper";

interface IHistoryWrapper {
  editor: Editor;
}

export const HistoryWrapper = ({ editor }: IHistoryWrapper) => {
  const [historyActive, setHistoryActive] = useAtom(historyActiveAtom);
  const editorVersion = useAtomValue(editorVersionAtom);
  const currentBranch = useAtomValue(currentBranchAtom);
  const [sliderVersion, setSliderVersion] = useAtom(sliderVersionAtom);

  const branchList = useAtomValue(branchListAtom);

  const { revertToVersion, switchBranch, createBranch } =
    useDocumentHistory(editor);

  useEffect(() => {
    setSliderVersion(editorVersion);
  }, [historyActive]);

  const handleSliderChange = (toVersion: number) => {
    setSliderVersion(toVersion);
    revertToVersion(currentBranch, toVersion);
  };

  const handelHistoryButton = () => {
    if (historyActive) {
      revertToVersion(currentBranch, editorVersion);
    }
    setHistoryActive((prev) => !prev);
  };
  return (
    <>
      <Button
        variant="outline"
        disabled={editorVersion === 0}
        onClick={handelHistoryButton}
        className={`fixed left-4 transition-all ${
          historyActive ? "bottom-[332px] " : "bottom-4"
        }`}
      >
        {historyActive ? (
          <>
            Back To Editing
            <ChevronDown />
          </>
        ) : (
          <>
            Show History <ChevronUp />
          </>
        )}
      </Button>

      {/* History Drawer */}
      <div
        className={`flex flex-row gap-6 fixed bottom-0 w-screen h-80 transition-all bg-stone-100 dark:bg-stone-950 border-t-2 py-4 px-8 ${
          !historyActive && "bottom-[-320px]"
        }`}
      >
        <div className="flex flex-col h-full gap-3">
          {/* Version Display */}
          <div className="bg-white dark:bg-stone-900 h-11 w-40 rounded-lg flex justify-center items-center">
            Version: {sliderVersion}
          </div>

          {/* Branch Selection */}
          <Select
            value={currentBranch}
            onValueChange={(value) => switchBranch(value)}
          >
            <SelectTrigger className="h-11 w-40">
              <GitGraph height={16} />
              <SelectValue placeholder="Main" defaultValue="main" />
            </SelectTrigger>
            <SelectContent>
              {branchList.map((branch) => (
                <SelectItem value={branch.name} key={branch.name}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Create Branch */}
          <Button
            variant="outline"
            className="h-11"
            onClick={() => createBranch(currentBranch, sliderVersion)}
          >
            <GitBranch />
            Create Branch
          </Button>
        </div>

        <div className="flex flex-col w-full gap-3">
          {/* History Timeline */}
          <div className="flex flex-row border w-full gap-4 rounded-lg pr-4 h-11">
            <div className="flex flex-row">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none border-r-2"
                disabled={sliderVersion < 1}
                onClick={() => handleSliderChange(sliderVersion - 1)}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="ghost"
                className="rounded-none border-r-2"
                size="icon"
                disabled={sliderVersion >= editorVersion}
                onClick={() => handleSliderChange(sliderVersion + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
            <Slider
              value={[sliderVersion]}
              onValueChange={(value) => handleSliderChange(value[0])}
              max={editorVersion}
              step={1}
              className="transition-all"
            />
          </div>

          {/* Git Graph */}
          <div className="flex h-full border rounded-lg overflow-scroll overflow-x-scroll">
            <div className="absolute px-2 py-1 z-30">Git Graph (view only)</div>
            <GitGraphWrapper />
          </div>
        </div>
      </div>
    </>
  );
};
