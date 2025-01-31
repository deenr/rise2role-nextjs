'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';

export function DataTableSkeleton() {
  const isMobile = useIsMobile();

  const columns: ColumnDef<null>[] = [
    {
      header: 'Title',
      accessorKey: 'jobTitle',
      cell: () => <Skeleton className="min-w-7xl h-4" />,
      enableHiding: false
    },
    {
      header: 'Company',
      accessorKey: 'companyName',
      cell: () => <Skeleton className="h-[22px] w-full" />
    },
    {
      header: 'Category',
      accessorKey: 'categoryId',
      cell: () => <Skeleton className="h-4 w-12" />
    },
    {
      header: 'Employees',
      accessorKey: 'companySize',
      cell: () => <Skeleton className="h-4 w-full" />
    },
    {
      header: 'Industry',
      accessorKey: 'companyIndustry',
      cell: () => <Skeleton className="h-4 w-full" />
    },
    {
      header: 'Work model',
      accessorKey: 'workModel',
      cell: () => <Skeleton className="h-4 w-full" />
    },
    {
      header: 'Skills',
      accessorKey: 'skills',
      cell: () => <Skeleton className="h-[22px] w-full" />
    }
  ];

  const table = useReactTable({
    data: [null, null, null, null, null, null, null],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <Card className="h-full overflow-hidden rounded-none sm:rounded-xl">
      <CardHeader className="flex h-fit flex-row items-end gap-3 space-y-0 px-3 py-5 sm:px-6">
        {isMobile ? (
          <Skeleton className="h-9 w-[99px]" />
        ) : (
          <>
            <div className="grid w-full max-w-xs gap-2">
              <Skeleton className="h-[14px] w-[92px]" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="grid w-full max-w-[192px] gap-2">
              <Skeleton className="h-[14px] w-[60px]" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="grid w-full max-w-[192px] gap-2">
              <Skeleton className="h-[14px] w-[79px]" />
              <Skeleton className="h-9 w-full" />
            </div>
          </>
        )}
        <Skeleton className="ml-auto h-9 w-[88px]" />
      </CardHeader>
      <Separator />
      <CardContent className="overflow-hidden p-0">
        <Table>
          <TableHeader className="h-[43.5px] text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-[56px]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
