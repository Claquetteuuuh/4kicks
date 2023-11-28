"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "./account_table.module.css";
import { AccountType } from "../../../types/dashboard/AccountType";

export default function AccountTable({
  data,
  handleDelete,
}: {
  data: AccountType[];
  handleDelete: (id: string, email: string) => void;
}) {
  const columns: ColumnDef<AccountType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className={styles.checkbox}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className={styles.checkbox}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className={styles.button_th}
          >
            Email
            <ArrowUpDown className="ml-2 h-10 w-10" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {`${row.original.email}`}
        </div>
      ),
    },
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={styles.button_th}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown className="ml-2 h-10 w-10" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.original.username}</div>
      ),
    },
    {
      accessorKey: "first_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={styles.button_th}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prenom
            <ArrowUpDown className="ml-2 h-10 w-10" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.original.first_name}</div>
      ),
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={styles.button_th}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom
            <ArrowUpDown className="ml-2 h-10 w-10" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.original.last_name}</div>
      ),
    },
    {
      accessorKey: "creation_date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className={styles.button_th}
          >
            Date de création
            <ArrowUpDown className="ml-2 h-10 w-10" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {`${new Date(row.original.creation_date).toDateString()}`}
        </div>
      ),
    },
    {
      accessorKey: "validated",
      header: "Validé",
      cell: ({ row }) => (
        <div className={styles.top_item}>{`${row.original.validated}`}</div>
      ),
    },
    {
        accessorKey: "preference",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className={styles.button_th}
            >
              Préférence
              <ArrowUpDown className="ml-2 h-10 w-10" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">
            {`${row.original.preference}`}
          </div>
        ),
      },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-10 w-10" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={styles.dropdown_content}
              align="end"
            >
              <DropdownMenuLabel className={styles.dropdown_item}>
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                className={styles.dropdown_item}
                onClick={() =>
                  navigator.clipboard.writeText(row.original.account_uid)
                }
              >
                Copy categorie ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  handleDelete(row.original.account_uid, row.original.email);
                }}
                className={`${styles.delete_button} ${styles.dropdown_item}`}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`${styles.dropdown_item} ${styles.info_button}`}
              >
                Informations
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={styles.container}>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className={`max-w-sm ${styles.search_input}`}
        />
        <Input
          placeholder="Filter username..."
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className={`max-w-sm ${styles.search_input}`}
        />
        <Input
          placeholder="Filter nom..."
          value={(table.getColumn("last_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("last_name")?.setFilterValue(event.target.value)
          }
          className={`max-w-sm ${styles.search_input}`}
        />
        <Input
          placeholder="Filter preference..."
          value={(table.getColumn("preference")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("preference")?.setFilterValue(event.target.value)
          }
          className={`max-w-sm ${styles.search_input}`}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`ml-auto ${styles.columns_button}`}
            >
              Columns <ChevronDown className="ml-2 h-10 w-10" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={styles.selected_columns_container}
            align="end"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className={styles.selected_columns}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
