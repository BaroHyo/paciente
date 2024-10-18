import React from "react";
import DetailTable from "@/components/demo/DetailTable";
import MasterTable from "@/components/demo/MasterTable";

interface MasterData {
  id: number;
  name: string;
  description: string;
}


export const EstudioPage: React.FC = () => {
  const masterData: MasterData[] = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' },
  ];

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Maestro-Detalle Grid Example</h1>
      <MasterTable data={masterData} />
      <DetailTable />
    </div>
  );
};
