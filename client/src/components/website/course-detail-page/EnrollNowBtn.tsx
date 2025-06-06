'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface EnrollNowButtonProps extends ButtonProps {
  courseId: string;
  className?: string;
  children?: React.ReactNode;
}

const EnrollNowButton = ({
  courseId,
  children,
  ...props
}: EnrollNowButtonProps) => {
  const router = useRouter();

  function handleOnClick() {
    // Navigate to payments page with courseId as query parameter
    router.push(`/payments?courseId=${courseId}`);
  }

  return (
    <Button {...props} onClick={handleOnClick}>
      {children}
    </Button>
  );
};

export default EnrollNowButton;
