'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { jobApplication, jobCategory } from '@prisma/client';
import { ColumnDef, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, Table as ITable, useReactTable } from '@tanstack/react-table';
import { ListFilter, Search } from 'lucide-react';

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
  const isMobile = useIsMobile();

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
      enableHiding: false,
      minSize: 256
    },
    {
      header: 'Company',
      accessorKey: 'companyName',
      minSize: 192
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
      },
      size: 156
    },
    {
      header: 'Employees',
      accessorKey: 'companySize',
      size: 128
    },
    {
      header: 'Industry',
      accessorKey: 'companyIndustry',
      size: 192
    },
    {
      header: 'Work model',
      accessorKey: 'workModel',
      filterFn: workModelFilterFn,
      maxSize: 240
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

  const hasActiveFilters = () => table.getColumn('jobTitle')?.getFilterValue() || table.getColumn('categoryId')?.getFilterValue() || table.getColumn('workModel')?.getFilterValue();
  const clearAllFilters = () => {
    table.getColumn('jobTitle')?.setFilterValue(undefined);
    table.getColumn('categoryId')?.setFilterValue(undefined);
    table.getColumn('workModel')?.setFilterValue(undefined);
  };

  return (
    <Card className="h-full overflow-hidden rounded-none sm:rounded-xl">
      <CardHeader className="flex h-fit flex-row items-end gap-3 space-y-0 px-3 py-5 sm:px-6">
        {isMobile ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <ListFilter /> Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-full flex-col gap-4 shadow-lg">
              <TitleInput className="" table={table} />
              <CategoryInput className="" table={table} categories={categories} />
              <WorkModelInput className="" table={table} />
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <TitleInput className="w-full max-w-xs" table={table} />
            <CategoryInput className="w-full max-w-[192px]" table={table} categories={categories} />
            <WorkModelInput className="w-full max-w-[192px]" table={table} />
          </>
        )}
        <Button variant="outline" className="ml-auto" disabled={!hasActiveFilters()} onClick={clearAllFilters}>
          Clear all
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="overflow-hidden p-0">
        <Table className="">
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

function TitleInput({
  table,
  className,
  ...props
}: {
  table: ITable<jobApplication>;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('grid gap-2', className)} {...props}>
      <Label htmlFor="email">Search for job</Label>
      <div className="group relative">
        <Input
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
  );
}

function WorkModelInput({ table, className, ...props }: { table: ITable<jobApplication> } & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('grid gap-2', className)} {...props}>
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
  );
}

function CategoryInput({ table, categories, className, ...props }: { table: ITable<jobApplication>; categories: jobCategory[] } & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('grid gap-2', className)} {...props}>
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
              <div className="h-1.5 w-1.5 rounded-full border bg-background" />
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
  );
}
