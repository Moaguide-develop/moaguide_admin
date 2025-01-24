import { BubbleMenu, Editor } from '@tiptap/react';
import { Icon } from '../icons/IconButtons';
import { CustomIcon } from '../icons/CustomButtons';

interface ToolBarProps {
  editor: Editor | null;
}

function SelectMenu({ editor }: ToolBarProps) {
  if (!editor) return null;

  const setTextColor = (color: string | null) => {
    if (color) {
      editor.chain().focus().setColor(color).run();
    } else {
      editor.chain().focus().unsetColor().run();
    }
  };

  const setHighlightColor = (color: string | null) => {
    if (color) {
      editor.chain().focus().setMark('highlight', { color }).run();
    } else {
      editor.chain().focus().unsetMark('highlight').run();
    }
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 200 }}
      shouldShow={({ editor }) => {
        const { from, to } = editor.state.selection;
        return to > from; // 텍스트가 선택된 경우만 보여줌
      }}
      className="flex gap-2"
    >
      <div className="bg-white flex items-center justify-start gap-1 px-2 border-b-2">
        <div className="flex bg-white items-center justify-center">
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => setTextColor(null)}
              className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
            >
              Reset
            </button>
            <input
              type="color"
              onChange={(e) => setTextColor(e.target.value)}
              className="ml-2"
            />
            <button
              onClick={() => setHighlightColor(null)}
              className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
            >
              Reset
            </button>
            <input
              type="color"
              onChange={(e) => setHighlightColor(e.target.value)}
              className="ml-2"
            />
          </div>
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
          <Icon.Underline editor={editor} />
          <CustomIcon.Quote editor={editor} />
          <CustomIcon.HorizontalRule editor={editor} />
          <Icon.Left editor={editor} />
          <Icon.Center editor={editor} />
          <Icon.Right editor={editor} />
          <Icon.Justify editor={editor} />
          <Icon.BulletList editor={editor} />
          <Icon.OrderedList editor={editor} />
        </div>
      </div>
    </BubbleMenu>
  );
}

export default SelectMenu;
