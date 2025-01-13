import { Step } from "@tiptap/pm/transform";
import { Editor } from "@tiptap/react";
import { useAtom, useSetAtom } from "jotai";
import {
  branchListAtom,
  currentBranchAtom,
  documentHistoryAtom,
  editorVersionAtom,
  HistoryStep,
  sliderVersionAtom,
} from "./atoms";

export const useDocumentHistory = (editor: Editor | null) => {
  const [history, setHistory] = useAtom(documentHistoryAtom);
  const [currentBranch, setCurrentBranch] = useAtom(currentBranchAtom);
  const setEditorVersion = useSetAtom(editorVersionAtom);
  const setSliderVersion = useSetAtom(sliderVersionAtom);
  const setBranchList = useSetAtom(branchListAtom);

  const recordStep = (steps: Step[]) => {
    if (!editor) return;
    const branch = history[currentBranch];
    const newVersion = branch.length;
    setHistory((prev) => {
      const newHistoryStep: HistoryStep = {
        version: newVersion,
        steps,
        timestamp: Date.now(),
      };

      const updatedBranch = [...branch, newHistoryStep];

      return {
        ...prev,
        [currentBranch]: updatedBranch,
      };
    });
    setEditorVersion(newVersion + 1);
    setBranchList((prevBranches) =>
      prevBranches.map((branch) =>
        branch.name === currentBranch
          ? { ...branch, length: branch.length + 1 }
          : branch
      )
    );
  };

  const revertToVersion = (branchName: string, version: number) => {
    if (!editor) return;
    editor.commands.clearContent();

    const { doc } = editor.state;
    let newDoc = doc;

    const stepsToApply = history[branchName]
      .filter((step) => step.version < version)
      .flatMap((step) => step.steps);

    stepsToApply.forEach((step) => {
      newDoc = step.apply(newDoc).doc!;
    });

    editor.commands.setContent(newDoc.toJSON());
  };

  const createBranch = (fromBranch: string, fromVersion: number) => {
    const newBranchName = `branch-${fromVersion}-${Date.now()}`;
    setHistory((prev) => {
      const baseBranch = prev[fromBranch];
      const baseSteps = baseBranch.slice(0, fromVersion);

      return {
        ...prev,
        [newBranchName]: [...baseSteps],
      };
    });
    setCurrentBranch(newBranchName);
    setBranchList((prev) => [
      ...prev,
      {
        name: newBranchName,
        length: fromVersion,
        originFrom: fromBranch,
        originStep: fromVersion,
      },
    ]);
    setEditorVersion(fromVersion);
    setSliderVersion(fromVersion);
  };

  // Switch to an existing branch
  const switchBranch = (branchName: string) => {
    if (history[branchName]) {
      const branchLatestVersion = history[branchName].length;
      setCurrentBranch(branchName);
      revertToVersion(branchName, branchLatestVersion);
      setEditorVersion(branchLatestVersion);
      setSliderVersion(branchLatestVersion);
    }
  };

  return {
    history,
    recordStep,
    revertToVersion,
    createBranch,
    switchBranch,
  };
};
