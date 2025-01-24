import { Editor } from '@tiptap/react';
import { CustomIcon } from '../icons/CustomButtons';

interface ToolBarProps {
  editor: Editor | null;
}

function CustomToolbar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <div className="flex items-center justify-start gap-1 px-4 border-b-2 sm:gap-8">
      <div className="flex items-center justify-center gap-1">
        <CustomIcon.AddPhoto editor={editor} />
        <CustomIcon.HorizontalRule editor={editor} />
        <CustomIcon.Quote editor={editor} />
        <CustomIcon.AddLink editor={editor} />
        <CustomIcon.AddFile editor={editor} />
        <CustomIcon.Table editor={editor} />
        <CustomIcon.AddPaywall editor={editor} />
      </div>
    </div>
  );
}

export default CustomToolbar;
