'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { courseSearchParams } from '@/lib/course-search-params-cache';
import { Filter, Search, X } from 'lucide-react';
import { useQueryStates } from 'nuqs';

interface CourseFiltersProps {
  onFiltersChange?: (filters: {
    query: string;
    category: string;
    level: string;
    minPrice: number | null;
    maxPrice: number | null;
  }) => void;
}

export function CourseListFilters({ onFiltersChange }: CourseFiltersProps) {
  // Use nuqs to manage URL state
  const [searchState, setSearchState] = useQueryStates(courseSearchParams);

  // Local state for search input to prevent focus loss
  const [searchValue, setSearchValue] = useState(searchState.query || '');

  // Local state for price range slider
  const [priceRange, setPriceRange] = useState<[number, number]>([
    searchState.minPrice ?? 0,
    searchState.maxPrice ?? 500
  ]);

  // Debounce timer ref
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Design',
    'Business',
    'Marketing',
    'Photography',
    'Music'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  // Helper function to notify parent of filter changes
  const notifyFiltersChange = useCallback(
    (newState: typeof searchState) => {
      onFiltersChange?.({
        query: newState.query,
        category: newState.category
          ? newState.category.split('•').join('•')
          : '',
        level: newState.level || '',
        minPrice: newState.minPrice,
        maxPrice: newState.maxPrice
      });
    },
    [onFiltersChange]
  );

  // Convert category array to dot-separated string
  const categoriesToString = (categories: string[]): string | null => {
    return categories.length > 0 ? categories.join('•') : null;
  };

  // Convert dot-separated string to category array
  const stringToCategories = (categoryString: string | null): string[] => {
    return categoryString ? categoryString.split('•') : [];
  };

  // Get current categories as array
  const currentCategories = stringToCategories(searchState.category);

  // Debounced search handler
  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      const newState = { ...searchState, query: value || null, page: 1 };
      setSearchState(newState);
      notifyFiltersChange(newState as any);
    }, 500); // 500ms debounce
  };

  // Sync local search value with URL state when it changes externally
  useEffect(() => {
    setSearchValue(searchState.query || '');
  }, [searchState.query]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...currentCategories, categoryName]
      : currentCategories.filter((c) => c !== categoryName);

    const newState = {
      ...searchState,
      category: categoriesToString(updatedCategories),
      page: 1
    };
    setSearchState(newState);
    notifyFiltersChange(newState);
  };

  const handleLevelChange = (level: string) => {
    const newState = {
      ...searchState,
      level: level || null,
      page: 1
    };
    setSearchState(newState);
    notifyFiltersChange(newState);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    const newState = {
      ...searchState,
      minPrice: values[0] === 0 ? null : values[0],
      maxPrice: values[1] === 500 ? null : values[1],
      page: 1
    };
    setSearchState(newState);
    notifyFiltersChange(newState);
  };

  const removeCategory = (categoryToRemove: string) => {
    const updatedCategories = currentCategories.filter(
      (c) => c !== categoryToRemove
    );
    const newState = {
      ...searchState,
      category: categoriesToString(updatedCategories),
      page: 1
    };
    setSearchState(newState);
    notifyFiltersChange(newState);
  };

  const clearFilters = () => {
    // Clear debounced search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setSearchValue('');
    setPriceRange([0, 500]);

    const newState = {
      ...searchState,
      query: null,
      category: null,
      level: null,
      minPrice: null,
      maxPrice: null,
      page: 1
    };
    setSearchState(newState);
    notifyFiltersChange(newState as any);
  };

  const hasActiveFilters =
    searchState.query ||
    currentCategories.length > 0 ||
    searchState.level ||
    searchState.minPrice !== null ||
    searchState.maxPrice !== null;

  const formatPriceRange = (min: number | null, max: number | null): string => {
    if (min === null && max === null) return '';
    if (min === null) return `Up to $${max}`;
    if (max === null) return `From $${min}`;
    return `$${min} - $${max}`;
  };

  return (
    <div className='divide-border space-y-4 divide-y'>
      {/* Search Section */}
      <div className='space-y-3 py-4'>
        <div className='flex items-center gap-2'>
          <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg'>
            <Search className='text-primary h-4 w-4' />
          </div>
          <h4 className='text-foreground text-lg font-semibold'>
            Search Courses
          </h4>
        </div>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
          <Input
            placeholder='Search for courses, topics, or instructors...'
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className='border-border/60 focus:border-primary/60 focus:ring-primary/20 h-11 pl-10'
          />
          {searchValue !== (searchState.query || '') && (
            <div className='absolute top-1/2 right-3 -translate-y-1/2'>
              <div
                className='h-2 w-2 animate-pulse rounded-full bg-amber-500'
                title='Typing...'
              />
            </div>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className='space-y-3 py-4'>
          <div className='flex items-center justify-between'>
            <Label className='text-foreground text-sm font-medium'>
              Active Filters
            </Label>
            <Button
              variant='ghost'
              size='sm'
              onClick={clearFilters}
              className='text-muted-foreground hover:text-foreground h-8 px-2'
            >
              Clear All
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {currentCategories.map((category) => (
              <Badge
                key={category}
                variant='secondary'
                className='bg-secondary/80 text-secondary-foreground hover:bg-secondary flex items-center gap-1 px-2 py-1'
              >
                {category}
                <X
                  className='hover:text-destructive h-3 w-3 cursor-pointer'
                  onClick={() => removeCategory(category)}
                />
              </Badge>
            ))}
            {searchState.level && (
              <Badge
                variant='secondary'
                className='bg-secondary/80 text-secondary-foreground'
              >
                Level: {searchState.level}
              </Badge>
            )}
            {(searchState.minPrice !== null ||
              searchState.maxPrice !== null) && (
              <Badge
                variant='secondary'
                className='bg-secondary/80 text-secondary-foreground'
              >
                Price:{' '}
                {formatPriceRange(searchState.minPrice, searchState.maxPrice)}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className='space-y-4 py-4'>
        {/* Heading */}
        <div className='flex items-center gap-2'>
          <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg'>
            <Filter className='text-primary h-4 w-4' />
          </div>
          <h4 className='text-foreground text-lg font-semibold'>
            Filter Options
          </h4>
          {currentCategories.length > 0 && (
            <div className='bg-muted text-muted-foreground ml-auto rounded-md px-2 py-1 text-xs'>
              {currentCategories.length} selected
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className='space-y-2'>
          {categories.map((category) => (
            <div key={category} className='group flex items-center space-x-3'>
              <Checkbox
                id={category}
                checked={currentCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
                className='data-[state=checked]:bg-primary data-[state=checked]:border-primary'
              />
              <Label
                htmlFor={category}
                className='text-foreground group-hover:text-primary cursor-pointer text-sm font-medium transition-colors'
              >
                {category}
              </Label>
            </div>
          ))}
        </div>

        {/* Level Filter */}
        <div className='space-y-2 pt-2'>
          <Label className='text-foreground text-sm font-semibold'>
            Difficulty Level
          </Label>
          <Select
            value={searchState.level || ''}
            onValueChange={handleLevelChange}
          >
            <SelectTrigger className='border-border/60 focus:border-primary/60 focus:ring-primary/20 h-11'>
              <SelectValue placeholder='Choose difficulty level' />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level} className='font-medium'>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className='space-y-4 pt-2'>
          <Label className='text-foreground text-sm font-semibold'>
            Price Range
          </Label>
          <div className='mt-8 pr-6'>
            <DualRangeSlider
              label={(value) => `$${value}`}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              min={0}
              max={500}
              step={5}
            />
          </div>
          <div className='text-muted-foreground flex justify-between text-sm'>
            <span>Min: ${priceRange[0]}</span>
            <span>Max: ${priceRange[1]}</span>
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant='outline'
            onClick={clearFilters}
            className='border-border/60 hover:bg-muted/80 hover:border-border mt-4 h-11 w-full font-medium'
          >
            <X className='mr-2 h-4 w-4' />
            Reset All Filters
          </Button>
        )}
      </div>
    </div>
  );
}
