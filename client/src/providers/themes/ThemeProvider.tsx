/**
 * ThemeProvider.tsx
 * This file is part of the Shadcn Theme.
 */

'use client';

/**
 * Package and Libraries Imports
 */
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps
} from 'next-themes';

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
