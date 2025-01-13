import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  Rows2,
  Underline as UnderLineIcon,
  Undo,
} from "lucide-react";

import { Editor } from "@tiptap/react";

interface IToolbarProps {
  editor: Editor;
}

export const ToolBarWrapper = ({ editor }: IToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-row justify-center snap-center md:fixed z-10 md:top-2 md:w-[calc(100vw-80px)] flex-wrap gap-4 md:gap-0 mt-20 md:mt-0 mb-6">
      <div className="flex gap-2 border-r-2 border-l-2 px-4">
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "default" : "outline"}
        >
          <Bold />
        </Button>

        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "default" : "outline"}
        >
          <Italic />
        </Button>

        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "default" : "outline"}
        >
          <UnderLineIcon />
        </Button>
      </div>
      <div className="flex gap-2 px-4 md:border-none border-r-2">
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
        >
          <List />
        </Button>
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
        >
          <ListOrdered />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={!editor.can().chain().focus().setHorizontalRule().run()}
        >
          <Rows2 />
        </Button>
      </div>
      <div className="flex gap-2 border-r-2 border-l-2 px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo />
        </Button>
      </div>
    </div>
  );
};
