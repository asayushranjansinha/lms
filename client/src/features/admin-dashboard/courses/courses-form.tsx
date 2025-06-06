'use client';
/**
 * Packages & Libraries
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

/**
 * Components & Hooks
 */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  CourseFormSchema,
  CourseLevel,
  courseSchema
} from '@/constants/schema';
import { useToast } from '@/hooks/use-toast';

/**
 * Types & Api
 */
import { createCourse, updateCourse } from '@/actions/courses';
import { CourseDetail } from '@/types';

export default function CourseForm({
  initialData,
  pageTitle
}: {
  initialData: CourseDetail | null;
  pageTitle: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const defaultValues = {
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    level: initialData?.level as CourseLevel,
    price: initialData?.price || 0,
    isPublished: initialData?.isPublished || true
  };

  const form = useForm<CourseFormSchema>({
    resolver: zodResolver(courseSchema),
    values: defaultValues
  });

  async function onSubmit(values: CourseFormSchema) {
    initialData?._id ? onUpdateCourse(values) : onCreateCourse(values);
    router.back();
  }

  async function onCreateCourse(values: CourseFormSchema) {
    try {
      await createCourse(values);
      toast({
        title: 'Course created successfully',
        description: 'Your course has been successfully created.'
      });
    } catch (error: any) {
      toast({
        title: error.message,
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    }
  }

  async function onUpdateCourse(values: CourseFormSchema) {
    try {
      await updateCourse(initialData!._id, values);
      toast({
        title: 'Course updated successfully',
        description: 'Your course has been successfully updated.'
      });
    } catch (error: any) {
      toast({
        title: error.message,
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Course Title */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Course title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Course Subtitle */}
              <FormField
                control={form.control}
                name='subtitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Subtitle</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Course subtitle' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='50'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value='web-development'>
                              Web Development
                            </SelectItem>
                            <SelectItem value='data-science'>
                              Data Science
                            </SelectItem>
                            <SelectItem value='design'>Design</SelectItem>
                            <SelectItem value='business'>Business</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='level'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Select a level' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Level</SelectLabel>
                            <SelectItem value={CourseLevel.Beginner}>
                              Beginner
                            </SelectItem>
                            <SelectItem value={CourseLevel.Intermediate}>
                              Intermediate
                            </SelectItem>
                            <SelectItem value={CourseLevel.Advanced}>
                              Advanced
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='space-y-8'>
              {/* Course Description */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe your course here '
                        className='min-h-[100px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isPublished'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <div className='space-y-0.5'>
                      <FormLabel>Publish Course</FormLabel>
                      <FormDescription>
                        Publish your course to make it visible to other users.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-end'>
              <Button type='submit'>
                {initialData?._id ? 'Save Changes' : 'Create Course'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
