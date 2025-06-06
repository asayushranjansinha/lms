import { getUserProfileData } from '@/actions/user';
import { ProfileForm } from './profile-create-form';
import { Skeleton } from '@/components/ui/skeleton';

export default async function ProfileViewPage() {
  const initialData = await getUserProfileData();
  return <ProfileForm initialData={initialData} />;
}


function ProfileViewPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Avatar + Upload */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-60" />
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Phone + Gender */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-24 w-full" />
      </div>

      {/* Submit button */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

ProfileViewPage.Skeleton = ProfileViewPageSkeleton;