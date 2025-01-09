import React from 'react';
import { TableRow } from '../common/sectionProps/TableSction';

interface TableSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: TableRow[];
  onUpdate: (content: TableRow[]) => void;
}

const TableSection: React.FC<TableSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
  onUpdate,
}) => {
  const handleCellChange = (rowId: string, cellId: string, newText: string) => {
    const updatedContent = content.map((row) =>
      row.id === rowId
        ? {
            ...row,
            cells: row.cells.map((cell) =>
              cell.id === cellId
                ? {
                    ...cell,
                    content: cell.content.map((paragraph) => ({
                      ...paragraph,
                      spans: paragraph.spans.map((span) =>
                        span.id === `${cellId}-span`
                          ? { ...span, content: newText }
                          : span,
                      ),
                    })),
                  }
                : cell,
            ),
          }
        : row,
    );
    onUpdate(updatedContent);
  };

  return (
    <div
      className="se-component se-table se-l-default"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
      <button
        className="se-component-edge-button se-component-edge-button-top __edge-area"
        type="button"
        tab-index="-1"
        data-compid={compid}
        data-direction="top"
      ></button>
      <div className="se-component-content">
        <div
          className="se-drop-indicator"
          data-unitid=""
          data-compid={compid}
          data-direction="top"
        >
          <div
            className="se-section se-section-table se-l-default se-section-align-left"
            style={{ width: '100%' }}
          >
            <div
              className="__se-toolbar-slot __se-cursor-unrelated"
              style={{ display: 'none' }}
            ></div>
            <div className="se-table-container">
              <div className="__se-cursor-unrelated se-table-control">
                <div className="__se-cursor-unrelated se-table-control se-is-on">
                  <ul className="se-cell-controlbar se-cell-controlbar-column">
                    <li
                      className="se-cell-controlbar-item"
                      style={{ width: '226px' }}
                    >
                      <button type="button" className="se-cell-select-button">
                        <span className="se-blind">0열 선택</span>
                      </button>
                      <button type="button" className="se-cell-add-button">
                        <span className="se-blind">0열 다음에 열 추가</span>
                      </button>
                    </li>
                    <li
                      className="se-cell-controlbar-item"
                      style={{ width: '227px' }}
                    >
                      <button type="button" className="se-cell-select-button">
                        <span className="se-blind">1열 선택</span>
                      </button>
                      <button type="button" className="se-cell-add-button">
                        <span className="se-blind">1열 다음에 열 추가</span>
                      </button>
                    </li>
                    <li
                      className="se-cell-controlbar-item"
                      style={{ width: '227px' }}
                    >
                      <button type="button" className="se-cell-select-button">
                        <span className="se-blind">2열 선택</span>
                      </button>
                      <button type="button" className="se-cell-add-button">
                        <span className="se-blind">2열 다음에 열 추가</span>
                      </button>
                    </li>
                  </ul>
                  <ul className="se-cell-controlbar se-cell-controlbar-row">
                    <li
                      className="se-cell-controlbar-item"
                      style={{ height: '45px' }}
                    >
                      <button type="button" className="se-cell-select-button">
                        <span className="se-blind">0행 선택</span>
                      </button>
                      <button type="button" className="se-cell-add-button">
                        <span className="se-blind">0행 다음에 행 추가</span>
                      </button>
                    </li>
                    <li
                      className="se-cell-controlbar-item"
                      style={{ height: '45px' }}
                    >
                      <button type="button" className="se-cell-select-button">
                        <span className="se-blind">1행 선택</span>
                      </button>
                      <button type="button" className="se-cell-add-button">
                        <span className="se-blind">1행 다음에 행 추가</span>
                      </button>
                    </li>
                    <li
                      className="se-cell-controlbar-item"
                      style={{ height: '46px' }}
                    >
                      <button type="button" className="se-cell-select-button">
                        <span className="se-blind">2행 선택</span>
                      </button>
                      <button type="button" className="se-cell-add-button">
                        <span className="se-blind">2행 다음에 행 추가</span>
                      </button>
                    </li>
                  </ul>
                  <button type="button" className="se-cell-select-all-button">
                    <span className="se-blind">셀 전체 선택</span>
                  </button>
                  <div
                    className="se-cell-size-controlbar se-cell-size-controlbar-width"
                    style={{ left: '226px' }}
                  >
                    <button type="button" className="se-cell-size-button">
                      <span className="se-blind">열 너비 조절</span>
                    </button>
                  </div>
                  <div
                    className="se-cell-size-controlbar se-cell-size-controlbar-height"
                    style={{ top: '45px' }}
                  >
                    <button type="button" className="se-cell-size-button">
                      <span className="se-blind">행 높이 조절</span>
                    </button>
                  </div>
                </div>
              </div>
              <table className="se-table-content">
                <tbody>
                  {content.map((row) => (
                    <tr key={row.id} id={row.id} className="se-tr">
                      {row.cells.map((cell) => (
                        <td
                          key={cell.id}
                          id={cell.id}
                          colSpan={cell.colspan}
                          rowSpan={cell.rowspan}
                          className="__se-unit se-cell"
                        >
                          <div
                            id={cell.id}
                            className="se-module se-module-text se-is-empty"
                          >
                            <p
                              id={cell.id}
                              className="se-text-paragraph se-text-paragraph-align-left"
                              style={{ lineHeight: '1.6' }}
                            >
                              {cell.content[0]?.spans.map((span) => (
                                <span
                                  key={span.id}
                                  id={span.id}
                                  className="se-ff-system se-fs15 __se-node"
                                  style={span.style}
                                >
                                  <input
                                    type="text"
                                    value={
                                      cell.content[0]?.spans.find(
                                        (span) => span.id === `${cell.id}-span`,
                                      )?.content || ''
                                    }
                                    onChange={(e) =>
                                      handleCellChange(
                                        row.id,
                                        cell.id,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </span>
                              ))}
                            </p>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSection;
