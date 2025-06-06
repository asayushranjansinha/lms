'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitReview: (data: { rating: number; review: string }) => void;
}

function ReviewModal({ onSubmitReview, open, onOpenChange }: ReviewModalProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) {
      toast({
        title: 'Please select a rating',
        description: 'Select a rating between 1 and 5',
        variant: 'destructive'
      });
      return;
    } else if (review === '') {
      toast({
        title: 'Please write a review message',
        description: 'Write a review to share with the course instructor',
        variant: 'destructive'
      });
      return;
    }
    onSubmitReview({ rating, review });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-border border-b px-6 py-4 text-base'>
            Share your experience
          </DialogTitle>
        </DialogHeader>
        <div className='px-6 py-4'>
          <form className='space-y-5' onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <fieldset className='space-y-4'>
                <legend className='text-foreground text-lg leading-none font-semibold'>
                  How would you rate this course?
                </legend>
                <RadioGroup
                  className='flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5'
                  onValueChange={(val) => setRating(Number(val))}
                >
                  {[0, 1, 2, 3, 4, 5].map((number) => (
                    <label
                      key={number}
                      className='border-input has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline-ring/70 relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border text-center text-sm outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[:focus-visible]:outline has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:z-10'
                    >
                      <RadioGroupItem
                        id={`radio-17-r${number}`}
                        value={number.toString()}
                        className='sr-only after:absolute after:inset-0'
                      />
                      {number}
                    </label>
                  ))}
                </RadioGroup>
                <div className='text-muted-foreground mt-2 flex justify-between text-xs'>
                  <p>Poor</p>
                  <p>Excellent</p>
                </div>
              </fieldset>

              <div className='space-y-2'>
                <Label htmlFor='feedback'>
                  Tell us what you liked or what could be improved
                </Label>
                <Textarea
                  id='feedback'
                  placeholder='Share your thoughts about the course...'
                  aria-label='Write your review'
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
            </div>
            <Button type='submit' className='w-full'>
              Submit Review
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ReviewModal };
