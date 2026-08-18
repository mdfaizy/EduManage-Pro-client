  import React, { ReactNode } from "react";

  interface TableProps {
    children: ReactNode;
    className?: string;
  }

  interface TableHeaderProps {
    children: ReactNode;
    className?: string;
  }

  interface TableBodyProps {
    children: ReactNode;
    className?: string;
  }

  interface TableRowProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }

  interface TableCellProps {
    children: ReactNode;
    isHeader?: boolean;
    className?: string;
    colSpan?: number;   // 👈 add this (important)
  }

  /* ---------------- COMPONENTS ---------------- */

  const Table: React.FC<TableProps> = ({ children, className }) => (
    <div className="overflow-x-auto">
      <table className={`min-w-full text-sm ${className}`}>{children}</table>
    </div>
  );

  const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => (
    <thead className={`bg-slate-50 text-slate-500 uppercase text-xs ${className}`}>
      {children}
    </thead>
  );

  const TableBody: React.FC<TableBodyProps> = ({ children, className }) => (
    <tbody className={className}>{children}</tbody>
  );

  const TableRow: React.FC<TableRowProps> = ({ children, className, onClick }) => (
    <tr onClick={onClick} className={`border-t border-slate-200 hover:bg-slate-50 transition ${className}`}>
      {children}
    </tr>
  );

  const TableCell: React.FC<TableCellProps> = ({
    children,
    isHeader = false,
    className,
    colSpan,
  }) => {
    const Tag = isHeader ? "th" : "td";
    return (
      <Tag colSpan={colSpan} className={`px-4 py-3 text-left ${className}`}>
        {children}
      </Tag>
    );
  };

  /* ---------------- EXPORTS (MOST IMPORTANT) ---------------- */

  export { Table, TableHeader, TableBody, TableRow, TableCell };
