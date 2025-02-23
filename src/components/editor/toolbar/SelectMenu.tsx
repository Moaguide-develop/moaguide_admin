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

  const setBlockUrl = () => {
    const node = getSelectedNode(editor);
    if (!node) return;

    const newUrl = prompt('YouTube URL을 입력하세요:');
    if (!newUrl) return;

    editor
      .chain()
      .focus()
      .updateAttributes(node.type.name, { url: newUrl })
      .run();
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
          [
            'file',
            'oglink',
            'imageLink',
            'textLink',
            'verticalLink',
            'default',
          ].includes(node.type.name)
        );
      }}
      className="border-2 border-[#d2d2d2]"
    >
      <div className="bg-white flex items-center justify-start gap-1 p-2 border-b-2">
        <div className="flex bg-white items-center justify-center">
          {(() => {
            const node = getSelectedNode(editor);
            if (
              node &&
              [
                'file',
                'oglink',
                'imageLink',
                'textLink',
                'verticalLink',
                'default',
              ].includes(node.type.name)
            ) {
              return (
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => setBlockAlignment('mr-auto ml-0')}
                    className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setBlockAlignment('mx-auto')}
                    className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setBlockAlignment('ml-auto mr-0')}
                    className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setBlockUrl()}
                    className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                    </svg>
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
                      X
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
                      X
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
