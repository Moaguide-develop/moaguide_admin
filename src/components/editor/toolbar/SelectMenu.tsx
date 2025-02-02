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

  const getSelectedNode = (editor: Editor) => {
    const { selection } = editor.state;
    let node = selection.$from.parent;
    const pos = selection.$from.pos;

    if (node.type.name === 'doc') {
      node = findNodeByPosition(editor, pos) || node;
    }

    return node;
  };

  const findNodeByPosition = (editor: Editor, pos: number) => {
    let foundNode = null;

    editor.state.doc.descendants((node, startPos) => {
      const endPos = startPos + node.nodeSize;
      if (pos >= startPos && pos <= endPos) {
        foundNode = node;
        return false;
      }
      return true;
    });

    return foundNode;
  };

  const setBlockAlignment = (alignment: string) => {
    const node = getSelectedNode(editor);
    if (!node) return;

    editor
      .chain()
      .focus()
      .updateAttributes(node.type.name, { alignment })
      .run();
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 200 }}
      shouldShow={({ editor }) => {
        const node = getSelectedNode(editor);
        return (
          node &&
          ['file', 'oglink', 'link', 'verticalLink', 'default'].includes(
            node.type.name,
          )
        );
      }}
      className="flex gap-2"
    >
      <div className="bg-white flex items-center justify-start gap-1 px-2 border-b-2">
        <div className="flex bg-white items-center justify-center">
          {(() => {
            const node = getSelectedNode(editor);
            if (
              node &&
              ['file', 'oglink', 'link', 'verticalLink', 'default'].includes(
                node.type.name,
              )
            ) {
              return (
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => setBlockAlignment('mr-auto ml-0')}
                    className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    Left
                  </button>
                  <button
                    onClick={() => setBlockAlignment('mx-auto')}
                    className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    Center
                  </button>
                  <button
                    onClick={() => setBlockAlignment('ml-auto mr-0')}
                    className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    Right
                  </button>
                </div>
              );
            } else {
              return (
                <>
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
                </>
              );
            }
          })()}
        </div>
      </div>
    </BubbleMenu>
  );
}

export default SelectMenu;
