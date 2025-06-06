'use client';
/**
 * Packages & Libraries
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

/**
 * Components & Hooks
 */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

/**
 * Other imports
 */
import { updateUserProfile } from '@/actions/user';
import { CTAButton } from '@/components/common/CTAButton';
import { ProfileFormData, profileSchema } from '@/constants/schema';
interface ProfileFormProps {
  initialData: any;
}
export function ProfileForm({ initialData }: ProfileFormProps) {
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.user.name,
      email: initialData.user.email,
      bio: initialData.user.bio,
      website: initialData.user.website,
      location: initialData.user.location,
      gender: initialData.user.gender,
      phoneNumber: initialData.user.phoneNumber
    }
  });

  const onSubmit = async (formData: ProfileFormData) => {
    try {
      await updateUserProfile(formData);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.'
      });
    } catch (error: any) {
      toast({
        title: error.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* Avatar */}
        <div className='flex items-center space-x-4'>
          <Avatar className='h-20 w-20'>
            <AvatarImage src={initialData.user.profilePicture} alt='Profile' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <FormField
            control={form.control}
            name='profilePicture'
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    className='max-w-[240px] shadow-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Name + Email */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter your name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='Enter your email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        </div>

        {/* Phone + Gender */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <>
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='+91-1234567890' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value as any}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a fruit' />
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                      <SelectGroup>
                        <SelectLabel>Genders</SelectLabel>
                        <SelectItem value='male'>Male</SelectItem>
                        <SelectItem value='female'>Female</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        </div>

        {/* Website */}
        <FormField
          control={form.control}
          name='website'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='url'
                  placeholder='https://your-website.com'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Tell us about yourself...' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CTAButton type='submit' title={'Update Profile'} className='w-full' />
      </form>
    </Form>
  );
}


