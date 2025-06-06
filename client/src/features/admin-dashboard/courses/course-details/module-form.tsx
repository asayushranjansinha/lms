'use client';

/**
 * Packages & Libraries
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

/**
 * Components & Hooks
 */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
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
import { ModuleFormSchema, moduleSchema } from '@/constants/schema';
import { useToast } from '@/hooks/use-toast';
import { CourseLectureType, CourseModule } from '@/types';

/**
 * Utility Functions
 */
const getDefaultFormValues = (
  courseId: string,
  initialData?: CourseModule | null
): ModuleFormSchema => {
  return {
    courseId,
    title: initialData?.title ?? '',
    duration: initialData?.duration ?? '',
    lectures: initialData?.lectures ?? []
  };
};

/**
 * Interface
 */
interface ModuleFormProps {
  courseId: string;
  pageTitle: string;
  initialData?: CourseModule | null;
  onSuccess?: () => void;
}

/**
 * Main Component
 */
export default function ModuleForm({
  courseId,
  pageTitle,
  initialData = null,
  onSuccess
}: ModuleFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const isEditMode = Boolean(initialData);

  // Initialize form with proper default values
  const form = useForm<ModuleFormSchema>({
    resolver: zodResolver(moduleSchema),
    defaultValues: getDefaultFormValues(courseId, initialData)
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'lectures'
  });

  /**
   * Effect to handle initial data changes
   * This is the key fix for your issue
   */
  useEffect(() => {
    if (initialData) {
      const formValues = getDefaultFormValues(courseId, initialData);

      // Reset the form with new values
      form.reset(formValues);

      // Also replace the lectures array to ensure field array is updated
      if (initialData.lectures) {
        replace(initialData.lectures);
      }
    }
  }, [initialData, courseId, form, replace]);

  /**
   * Lecture Management
   */
  const handleAddLecture = () => {
    append({
      title: '',
      duration: '',
      type: CourseLectureType.Video,
      videoUrl: '',
      documentUrl: '',
      assignmentUrl: ''
    });
  };

  const handleRemoveLecture = (index: number) => {
    remove(index);
  };

  const resetForm = () => {
    const defaultValues = getDefaultFormValues(courseId);
    form.reset(defaultValues);
    replace([]);
  };

  const handleCancel = () => {
    if (isEditMode && initialData) {
      const formValues = getDefaultFormValues(courseId, initialData);
      form.reset(formValues);
      if (initialData.lectures) {
        replace(initialData.lectures);
      }
    } else {
      resetForm();
    }
  };

  /**
   * Form Submission
   */
  async function onSubmit(values: ModuleFormSchema) {
    if (fields.length === 0) {
      toast({
        title: 'Please add at least one lecture',
        description: 'Please add at least one lecture to your module.',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (isEditMode) {
        await handleUpdateModule(values);
      } else {
        await handleCreateModule(values);
      }
    } catch (error) {
      // console.error('Form submission error:', error);
      toast({
        title: 'Network error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    }
  }

  /**
   * API Handlers
   */
  const handleCreateModule = async (values: ModuleFormSchema) => {
    try {
      toast({
        title: 'Module created successfully',
        description: 'Module has been added successfully.'
      });
      resetForm();
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Failed to create module',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleUpdateModule = async (values: ModuleFormSchema) => {
    if (!initialData?._id) {
      throw new Error('Module ID is required for update');
    }

    try {
      toast({
        title: 'Module updated successfully',
        description: 'Module has been updated successfully.'
      });
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Failed to update module',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <section id='module-form'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-left text-2xl font-bold'>
            {pageTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* Module Basic Info */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter module title' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='duration'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Duration</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., 2 weeks' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Lectures Section */}
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold'>Lectures</h2>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={handleAddLecture}
                  >
                    + Add Lecture
                  </Button>
                </div>

                {fields.length === 0 && (
                  <div className='text-muted-foreground py-6 text-center'>
                    No lectures added yet. Click Add Lecture to get started.
                  </div>
                )}

                {fields.map((field, index) => {
                  const lectureType = form.watch(`lectures.${index}.type`);

                  return (
                    <div
                      key={field.id}
                      className='bg-muted/20 space-y-4 rounded-lg border p-6'
                    >
                      <div className='flex items-center justify-between'>
                        <h3 className='text-muted-foreground text-sm font-medium'>
                          Lecture {index + 1}
                        </h3>
                        <Button
                          type='button'
                          variant='destructive'
                          size='sm'
                          onClick={() => handleRemoveLecture(index)}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <FormField
                          control={form.control}
                          name={`lectures.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lecture Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Enter lecture title'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`lectures.${index}.duration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lecture Duration</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='e.g., 45 minutes'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`lectures.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lecture Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className='w-full md:w-[200px]'>
                                <SelectValue placeholder='Select lecture type' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Lecture Type</SelectLabel>
                                  <SelectItem value={CourseLectureType.Video}>
                                    Video
                                  </SelectItem>
                                  <SelectItem
                                    value={CourseLectureType.Document}
                                  >
                                    Document
                                  </SelectItem>
                                  <SelectItem
                                    value={CourseLectureType.Assignment}
                                  >
                                    Assignment
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Conditional URL Fields */}
                      {lectureType === CourseLectureType.Video && (
                        <FormField
                          control={form.control}
                          name={`lectures.${index}.videoUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Enter video URL'
                                  {...field}
                                  value={field.value || ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {lectureType === CourseLectureType.Document && (
                        <FormField
                          control={form.control}
                          name={`lectures.${index}.documentUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Enter document URL'
                                  {...field}
                                  value={field.value || ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {lectureType === CourseLectureType.Assignment && (
                        <FormField
                          control={form.control}
                          name={`lectures.${index}.assignmentUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assignment URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Enter assignment URL'
                                  {...field}
                                  value={field.value || ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Form Actions */}
              <div className='flex justify-end gap-3 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleCancel}
                  disabled={form.formState.isSubmitting}
                >
                  {isEditMode ? 'Reset' : 'Clear'}
                </Button>
                <Button
                  type='submit'
                  className='min-w-[120px]'
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? `${isEditMode ? 'Updating' : 'Creating'}...`
                    : `${isEditMode ? 'Update' : 'Create'} Module`}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
