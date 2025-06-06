'use client';

/**
 * Packages & Libraries
 */
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Text } from 'lucide-react';

/**
 * Components & Utilities
 */
import { CellAction } from './cell-action';

/**
 * Types & Constants
 */
import { Course } from '@/types';

/**
 * Column Definition
 */
export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: 'TITLE',
    meta: {
      label: 'Title',
      placeholder: 'Search courses...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'category',
    header: 'CATEGORY',
    meta: {
      label: 'Level'
    },
    cell: ({ cell }) => (
      <span className='capitalize'>
        {cell.getValue<Course['category']>().replace(/-/g, ' ')}
      </span>
    )
  },
  {
    accessorKey: 'level',
    header: 'LEVEL',
    meta: {
      label: 'Level'
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'CREATED',
    cell: ({ cell }) => (
      <div>{format(cell.getValue<Course['createdAt']>(), 'dd/MM/yyyy')}</div>
    ),
    meta: {
      label: 'Created At'
    }
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
    meta: {
      label: 'Price'
    }
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    cell: ({ cell }) => (
      <p className='truncate text-ellipsis'>
        {cell.getValue<Course['description']>()}
      </p>
    ),
    meta: {
      label: 'Description'
    }
  },
  {
    accessorKey: 'createdBy',
    header: 'CREATED BY',
    meta: {
      label: 'Created By'
    },
    cell: ({ cell }) => <p>{cell.getValue<Course['createdBy']>().name}</p>
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex flex-1 justify-end'>
        <CellAction data={row.original} />
      </div>
    )
  }
];
