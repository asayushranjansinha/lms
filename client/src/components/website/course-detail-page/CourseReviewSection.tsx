'use client';

import { submitReview } from '@/actions/reviews';
import { ReviewModal } from '@/components/modal/ReviewModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { useToast } from '@/hooks/use-toast';
import { UserReview } from '@/types';
import { format } from 'date-fns';
import { User } from 'lucide-react';
import { useState } from 'react';

interface CourseReviewProps {
  isEnrolled: boolean;
  courseId: string;
  reviews: UserReview[];
}
const CourseReviewSection = ({
  isEnrolled,
  courseId,
  reviews
}: CourseReviewProps) => {
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const { toast } = useToast();

  async function handleSubmitReview(data: { rating: number; review: string }) {
    try {
      await submitReview(courseId, data);
      toast({
        title: 'Review submitted successfully',
        description: 'Thank you for your feedback!'
      });
      setShowReviewModal(false);
    } catch (error: any) {
      toast({
        title: 'Error submitting review',
        description: error.message
      });
    }
  }

  return (
    <section className='relative container mx-auto space-y-6 px-4 py-20 md:px-0'>
      {/* Show already submitted reviews */}
      <div className='space-y-4'>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      {/* Show empty state if no reviews yet */}
      {(reviews === undefined || reviews.length === 0) && (
        <div className='py-12 text-center'>
          <div className='bg-primary/10 border-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-sm'>
            <User className='text-primary h-8 w-8' />
          </div>
          <h3 className='mb-2 text-lg font-medium'>No reviews yet</h3>
          <p className='text-muted-foreground mb-6'>
            Be the first to share your experience with this course.
          </p>
        </div>
      )}

      {/* Show review form */}
      {isEnrolled && (
        <div className='flex items-center justify-center'>
          <ReviewModal
            onSubmitReview={handleSubmitReview}
            open={showReviewModal}
            onOpenChange={(open) => setShowReviewModal(open)}
          />

          <Button onClick={() => setShowReviewModal(true)}>Add Review</Button>
        </div>
      )}
    </section>
  );
};

const ReviewCard: React.FC<{ review: UserReview }> = ({ review }) => {
  const { name, bio, profilePicture } = review.user;
  const { review: message, rating, createdAt } = review;
  return (
    <div className='bg-card rounded-lg border p-4'>
      <div className='mb-3 flex items-start gap-3'>
        {/* Avatar */}

        <Avatar>
          <AvatarImage
            src={profilePicture ?? 'https://github.com/shadcn.png'}
          />
          <AvatarFallback>{name?.split(' ')[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className='min-w-0 flex-1'>
          <div className='mb-1 flex items-center gap-2'>
            <h4 className='font-medium'>{name}</h4>
            <p className='text-muted-foreground text-sm'>{bio}</p>
            <span className='rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800'>
              Verified
            </span>
          </div>

          <div className='mb-2 flex items-center gap-2'>
            <StarRating defaultValue={rating} disabled size='sm' />

            <span className='text-muted-foreground text-sm'>
              {format(new Date(createdAt), 'LLL d, yyyy')}
            </span>
          </div>
        </div>
      </div>

      <p className='ml-12 leading-relaxed'>{message}</p>
    </div>
  );
};

export default CourseReviewSection;
