import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useAtomValue, useSetAtom } from "jotai";
import {
  characterCountAtom,
  historyActiveAtom,
  wordCountAtom,
} from "@/state/atoms";
import { ToolBarWrapper } from "@/wrappers/ToolBarWrapper";
import { useDocumentHistory } from "@/state/historyStateHook";
import { Step } from "@tiptap/pm/transform";
import { HistoryWrapper } from "@/wrappers/HistoryWrapper";
import { useEffect } from "react";

const getWordsCount = (text: string) =>
  text
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

export const NotePad = () => {
  const setWordCount = useSetAtom(wordCountAtom);
  const setCharacterCount = useSetAtom(characterCountAtom);
  const historyActive = useAtomValue(historyActiveAtom);

  const updateCounts = (editor: Editor) => {
    const text = editor?.getText();
    setWordCount(getWordsCount(text));
    setCharacterCount(text.length);
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
    onCreate: ({ editor }) => {
      updateCounts(editor);
    },
    onUpdate: ({ editor }) => {
      updateCounts(editor);
    },
    onTransaction: ({ transaction }) => {
      if (!historyActive) {
        const newSteps: Step[] = transaction.steps;
        if (newSteps.length > 0) {
          documentHistory.recordStep(newSteps);
        }
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:text-stone-100 placeholder:text-stone-400 mx-auto outline-none",
      },
    },
  });

  useEffect(() => {
    editor?.setOptions({ editable: !historyActive });
  }, [historyActive]);

  const documentHistory = useDocumentHistory(editor);

  return (
    <>
      <ToolBarWrapper editor={editor!} />
      <HistoryWrapper editor={editor!} />
      <div
        onClick={() => editor?.commands.focus()}
        className="container md:w-[800px] mx-auto  md:mt-[72px] py-12 bg-white dark:bg-neutral-900 min-h-[calc(100svh-80px)] px-16 md:rounded-lg"
      >
        {editor?.getText() == "" && (
          <div className="dark:text-stone-500 text-stone-400 absolute mt-0.5 lg:mx-5">
            Hello there, you can type away here!
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
