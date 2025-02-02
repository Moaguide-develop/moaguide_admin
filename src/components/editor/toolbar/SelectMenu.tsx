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
    let node = selection.$from.parent; // 현재 선택한 노드 가져오기
    const pos = selection.$from.pos; // 현재 포커스 위치

    // `doc`인 경우, 포커스 위치를 기반으로 실제 노드를 찾음
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
        return false; // 찾으면 중단
      }
      return true;
    });

    return foundNode;
  };

  const setBlockAlignment = (alignment: string) => {
    const node = getSelectedNode(editor);
    if (!node) return;

    console.log('✅ 선택한 노드:', node);
    console.log('✅ 선택한 노드 타입:', node.type.name);
    console.log('✅ 변경 전 속성:', editor.getAttributes(node.type.name));

    editor
      .chain()
      .focus()
      .updateAttributes(node.type.name, { alignment })
      .run();

    console.log('✅ 변경 후 속성:', editor.getAttributes(node.type.name));
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 200 }}
      shouldShow={({ editor }) => {
        const node = getSelectedNode(editor);
        return node && ['file', 'link', 'default'].includes(node.type.name);
      }}
      className="flex gap-2"
    >
      <div className="bg-white flex items-center justify-start gap-1 px-2 border-b-2">
        <div className="flex bg-white items-center justify-center">
          {(() => {
            const node = getSelectedNode(editor);
            if (node && ['file', 'link', 'default'].includes(node.type.name)) {
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
