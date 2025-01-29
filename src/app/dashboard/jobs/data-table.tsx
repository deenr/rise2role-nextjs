'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { jobApplication, jobCategory } from '@prisma/client';
import { ColumnDef, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useId, useRef } from 'react';

const workModels = ['Remote', 'Hybrid', 'On-site'];

const multiColumnFilterFn: FilterFn<jobApplication> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.jobTitle} ${row.original.companyName}`.toLowerCase();
  const searchTerm = (filterValue ?? '').toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const workModelFilterFn: FilterFn<jobApplication> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const workModel = row.getValue(columnId) as string;
  return filterValue.includes(workModel);
};

export function DataTable({ data, categories }: { data: jobApplication[]; categories: jobCategory[] }) {
  const id = useId();

  const inputRef = useRef<HTMLInputElement>(null);

  const columns: ColumnDef<jobApplication>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
    },
    {
      header: 'Title',
      accessorKey: 'jobTitle',
      cell: ({ row }) => <div className="text-nowrap font-medium">{row.getValue('jobTitle')}</div>,
      filterFn: multiColumnFilterFn,
      enableHiding: false
    },
    {
      header: 'Company',
      accessorKey: 'companyName'
    },
    {
      header: 'Category',
      accessorKey: 'categoryId',
      cell: ({ row }) => {
        const categoryId = row.getValue('categoryId');
        const category = categories.find((c) => c.id === categoryId);

        if (!category) return null;

        return (
          <Badge variant="outline" className="bg-background pl-2 font-medium">
            <div className="mr-1.5 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category.hexColor }} />
            {category.name}
          </Badge>
        );
      }
    },
    {
      header: 'Amount of employees',
      accessorKey: 'companySize'
    },
    {
      header: 'Industry',
      accessorKey: 'companyIndustry'
    },
    {
      header: 'Work model',
      accessorKey: 'workModel',
      filterFn: workModelFilterFn
    },
    {
      header: 'Skills',
      accessorKey: 'skills',
      cell: ({ row }) => {
        const skills = row.getValue('skills') as string[];
        return (
          skills &&
          skills.length > 0 &&
          skills[0] !== '' && (
            <div className="flex flex-row gap-1">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-nowrap bg-background">
                  {skill}
                </Badge>
              ))}
            </div>
          )
        );
      }
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex h-fit flex-row items-end gap-3 space-y-0 px-6 py-5">
        <div className="grid w-full max-w-xs gap-2">
          <Label htmlFor="email">Search for job</Label>
          <div className="group relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              value={(table.getColumn('jobTitle')?.getFilterValue() ?? '') as string}
              onChange={(e) => table.getColumn('jobTitle')?.setFilterValue(e.target.value)}
              className="pl-9"
              name="jobTitle"
              placeholder="Search by job title or company name"
              required
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all group-focus-within:scale-110 group-focus-within:text-primary" />
          </div>
        </div>
        <div className="grid w-full max-w-[192px] gap-2">
          <Label htmlFor="jobCategory">Category</Label>
          <Select
            name="categoryId"
            value={(table.getColumn('categoryId')?.getFilterValue() ?? 'all') as string}
            onValueChange={(value) => table.getColumn('categoryId')?.setFilterValue(value === 'all' ? '' : value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex flex-row items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                  All
                </div>
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex flex-row items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category.hexColor }} />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-[192px] gap-2">
          <Label htmlFor="workModel">Work Model</Label>
          <Select
            name="workModel"
            value={(table.getColumn('workModel')?.getFilterValue() ?? 'all') as string}
            onValueChange={(value) => table.getColumn('workModel')?.setFilterValue(value === 'all' ? '' : value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {workModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="ml-auto" disabled>
          Clear all
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="overflow-hidden p-0">
        <Table className="table-fixed">
          <TableHeader className="text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
