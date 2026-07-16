import { useEffect, useState, type ReactNode } from "react";

export type ScribeTableColumnPort = {
  label: string;
  name: string;
};

export type ScribeTableRowPort = {
  id?: string | number;
  content: Record<string, ReactNode>;
  [key: string]: unknown;
};

export type ScribeTablePortProps = {
  columns?: ScribeTableColumnPort[];
  data?: ScribeTableRowPort[];
  dataTestId?: string;
  hideHeaders?: boolean;
  highlightSelectedRow?: boolean;
  isLoading?: boolean;
  noDataMessage?: string;
  setSelectedRow?: (row: ScribeTableRowPort | null) => void;
};

/**
 * Source-truth port of:
 * - Scribe/src/components/shared/Table.tsx
 */
export function ScribeTablePort({
  columns = [],
  data = [],
  dataTestId = "data-table",
  hideHeaders = false,
  highlightSelectedRow = false,
  isLoading = false,
  noDataMessage = "no-data",
  setSelectedRow = () => {},
}: ScribeTablePortProps) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [items, setItems] = useState<ScribeTableRowPort[]>([]);
  const hasItems = items.length > 0;

  useEffect(() => {
    setItems(data || []);
  }, [data]);

  const rowClick = (row: ScribeTableRowPort, rowIndex: number) => {
    if (selectedRowIndex === rowIndex) {
      setSelectedRowIndex(null);
      setSelectedRow(null);
    } else {
      setSelectedRowIndex(rowIndex);
      setSelectedRow(row);
    }
  };

  return (
    <>
      <table className="scribe-table-port" data-testid={dataTestId}>
        {!hideHeaders ? (
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {items.map((row, rowIndex) => (
            <tr
              key={`${row.id} - ${rowIndex}`}
              onClick={() => rowClick(row, rowIndex)}
              className={
                highlightSelectedRow && selectedRowIndex === rowIndex
                  ? "hightlight-selected"
                  : undefined
              }
            >
              {columns.map((column) => (
                <td key={column.name}>{row.content[column.name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {!hasItems && !isLoading ? <p>{noDataMessage}</p> : null}
    </>
  );
}

/**
 * Source-truth port of the row action from:
 * - Scribe/src/components/Videos/AssetsFieldset.tsx
 */
export function ScribeTableActionPort({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className="scribe-table-port-action" onClick={onClick} type="button">
      {children}
    </button>
  );
}
