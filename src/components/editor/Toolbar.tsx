import { Editor } from '@tiptap/react';
import { Icon } from './icons/IconButtons'; // Icon 모듈 가져오기
import { CustomIcon } from './icons/CustomButtons';

interface ToolBarProps {
  editor: Editor | null;
}

function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <div className="flex items-center justify-center gap-2 p-6 py-3 border-b-2 sm:gap-8">
      <div className="flex items-center justify-center gap-2">
        <Icon.H1 editor={editor} />
        <Icon.H2 editor={editor} />
        <Icon.H3 editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Icon.Bold editor={editor} />
        <Icon.Italic editor={editor} />
        <Icon.Strikethrough editor={editor} />
        <Icon.Underline editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Icon.Left editor={editor} />
        <Icon.Center editor={editor} />
        <Icon.Right editor={editor} />
        <Icon.Justify editor={editor} />
        <Icon.BulletList editor={editor} />
        <Icon.OrderedList editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <CustomIcon.Quote editor={editor} />
        <CustomIcon.AddPhoto editor={editor} />
        <CustomIcon.AddPaywall editor={editor} />
      </div>
    </div>
  );
}

export default ToolBar;
