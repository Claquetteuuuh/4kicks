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
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { AvisType } from "../../../types/dashboard/AvisType";
import styles from "./avis_table.module.css";
import axios from "axios";

export default function AvisTable({ data, handleDelete }: { data: AvisType[], handleDelete: (id: string) => void }) {

    const columns: ColumnDef<AvisType>[] = [
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
            accessorKey: "uid",
            header: "uid",
            cell: ({ row }) => (
                <div className={styles.top_item}>{row.original.avis_uid}</div>
            ),
        },
        {
            accessorKey: "notation",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className={styles.button_th}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        notation
                        <ArrowUpDown className="ml-2 h-10 w-10" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase">{row.original.notation}</div>,
        },
        {
            accessorKey: "content",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={styles.button_th}
                    >
                        content
                        <ArrowUpDown className="ml-2 h-10 w-10" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase">{row.original.content}</div>,
        },
        {
            accessorKey: "date de creation",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={styles.button_th}
                    >
                        date de creation
                        <ArrowUpDown className="ml-2 h-10 w-10" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase">{`${new Date(row.original.creation_date).toDateString()}`}</div>,
        },
        {
            accessorKey: "user Name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className={styles.button_th}
                    >
                        user Name
                        <ArrowUpDown className="ml-2 h-10 w-10" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase">{row.original.user_name}</div>,
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
                        <DropdownMenuContent className={styles.dropdown_content} align="end">
                            <DropdownMenuLabel className={styles.dropdown_item}>
                                Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                className={styles.dropdown_item}
                                onClick={() =>
                                    navigator.clipboard.writeText(row.original.avis_uid)
                                }
                            >
                                Copy Avis ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={e => { handleDelete(row.original.avis_uid) }} className={`${styles.delete_button} ${styles.dropdown_item}`}>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${styles.dropdown_item} ${styles.info_button}`}>Informations</DropdownMenuItem>
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
                    placeholder="Filter notation..."
                    value={(table.getColumn("notation")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("notation")?.setFilterValue(event.target.value)
                    }
                    className={`max-w-sm ${styles.search_input}`}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={`ml-auto ${styles.columns_button}`}>
                            Columns <ChevronDown className="ml-2 h-10 w-10" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={styles.selected_columns_container} align="end">
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
