// DetailTable.tsx
import React from 'react';
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from '@tanstack/react-table';
import { useStore } from './useStore';

interface DetailData {
  id: number;
  detail: string;
}

const DetailTable: React.FC = () => {
  const { detailData, selectedRow, selectedDetailRow, selectDetailRow } = useStore();

  const columns = React.useMemo<ColumnDef<DetailData>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Detail ID',
      },
      {
        accessorKey: 'detail',
        header: 'Detail',
      },
    ],
    []
  );

  const table = useReactTable({
    data: detailData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!selectedRow) {
    return <div className="mt-4">Seleccione una fila para ver los detalles.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mt-4">Detalles para {selectedRow.name}</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => selectDetailRow(row.original)}
              className={`cursor-pointer hover:bg-gray-100 ${selectedDetailRow?.id === row.original.id ? 'bg-green-100' : ''}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTable;
