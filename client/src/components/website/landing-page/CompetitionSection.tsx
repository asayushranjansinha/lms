/**
 * Packages & Libraries
 */
import { Check, Columns, Monitor, Smartphone, X } from 'lucide-react';

/**
 * Components & Utilities
 */
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const items = [
  {
    feature: 'Course Creation',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Bulk User Management',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Advanced Analytics',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Live Classes / Webinars',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Certifications & Badges',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: false },
      { name: 'Classplus', supported: false }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: false },
      { name: 'Classplus', supported: false }
    ]
  },
  {
    feature: 'Mobile App Availability',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Integrations',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Payment & Monetization',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: false },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: false },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Custom Branding',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Student Analytics & Reporting',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Offline Access',
    desktop: [
      { name: 'Learnova', supported: false },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: false }
    ],
    mobile: [
      { name: 'Learnova', supported: false },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: false }
    ]
  },
  {
    feature: 'Discussion Forums / Community',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Assignments & Assessments',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Content Hosting Limits / Storage',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: false },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: true },
      { name: 'Coursera', supported: true },
      { name: 'Teachmint', supported: false },
      { name: 'Classplus', supported: true }
    ]
  },
  {
    feature: 'Multi-tier Roles & Permissions',
    desktop: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ],
    mobile: [
      { name: 'Learnova', supported: true },
      { name: 'Udemy', supported: false },
      { name: 'Coursera', supported: false },
      { name: 'Teachmint', supported: true },
      { name: 'Classplus', supported: true }
    ]
  }
];

export function CompetitorComparison() {
  return (
    <section id='comparison' className='container mx-auto px-4 py-24 md:px-0'>
      <div className='mb-16 space-y-4 text-center'>
        <Badge variant='outline' className='mx-auto w-fit'>
          <Columns className='mr-1 h-3 w-3' />
          Our Platform Comparison
        </Badge>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Compare Our LMS Features
        </h2>
        <p className='text-muted-foreground mx-auto max-w-[800px] text-xl'>
          Explore the features and capabilities that set our LMS apart,
          empowering educators and learners across India and beyond.
        </p>
      </div>

      {/* Desktop Table - visible on md+ */}
      <div className='hidden md:block'>
        <Table className='bg-background'>
          <TableHeader>
            <TableRow className='*:border-border border-y-0 hover:bg-transparent [&>:not(:last-child)]:border-r'>
              <TableCell></TableCell>
              <TableHead
                className='border-border border-b text-center'
                colSpan={5}
              >
                <Monitor className='inline-flex' size={16} strokeWidth={2} />
                <span className='sr-only'>Desktop</span>
              </TableHead>
              <TableHead
                className='border-border border-b text-center'
                colSpan={5}
              >
                <Smartphone className='inline-flex' size={16} strokeWidth={2} />
                <span className='sr-only'>Mobile</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableHeader>
            <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
              <TableCell></TableCell>
              {items[0].desktop.map((platform) => (
                <TableHead
                  key={platform.name}
                  className='text-foreground h-auto rotate-180 py-3 [writing-mode:vertical-lr]'
                >
                  {platform.name}
                </TableHead>
              ))}
              {items[0].mobile.map((platform) => (
                <TableHead
                  key={platform.name}
                  className='text-foreground h-auto rotate-180 py-3 [writing-mode:vertical-lr]'
                >
                  {platform.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.feature}
                className='*:border-border [&>:not(:last-child)]:border-r'
              >
                <TableHead className='text-foreground font-medium'>
                  {item.feature}
                </TableHead>
                {[...item.desktop, ...item.mobile].map((entry, idx) => (
                  <TableCell
                    key={`${entry.name}-${idx}`}
                    className='space-y-1 text-center'
                  >
                    {entry.supported ? (
                      <Check
                        className='inline-flex stroke-emerald-600'
                        size={16}
                        strokeWidth={2}
                        aria-hidden='true'
                      />
                    ) : (
                      <X
                        className='inline-flex stroke-red-600'
                        size={16}
                        strokeWidth={2}
                        aria-hidden='true'
                      />
                    )}
                    <span className='sr-only'>
                      {entry.supported ? 'Supported' : 'Not supported'}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile List - visible only on small screens */}
      <div className='block space-y-8 md:hidden'>
        {items.map(({ feature, mobile }) => (
          <div
            key={feature}
            className='bg-background rounded-md border p-4 shadow-sm'
          >
            <h3 className='text-foreground mb-4 text-lg font-semibold'>
              {feature}
            </h3>
            <ul className='space-y-3'>
              {mobile.map(({ name, supported }) => (
                <li key={name} className='flex items-center justify-between'>
                  <span className='text-foreground font-medium'>{name}</span>
                  {supported ? (
                    <Check className='stroke-emerald-600' size={20} />
                  ) : (
                    <X className='stroke-red-600' size={20} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
