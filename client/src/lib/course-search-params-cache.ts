import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

// Course-specific search parameters
export const courseSearchParams = {
  // Pagination
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(12),
  
  // Search query
  query: parseAsString.withDefault(''),
  
  // Single category selection
  category: parseAsString,
  
  // Difficulty level
  level: parseAsString,
  
  // Price range using separate min/max values
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  
  // Optional: Add sorting if needed
  // sortBy: parseAsStringEnum(['price', 'rating', 'name', 'date']).withDefault('name'),
  // sortOrder: parseAsStringEnum(['asc', 'desc']).withDefault('asc'),
};

export const courseSearchParamsCache = createSearchParamsCache(courseSearchParams);
export const courseSerialize = createSerializer(courseSearchParams);