"use client"

import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CTAButtonProps extends ButtonProps {
  isLoading?:boolean;
  isDisabled?:boolean;
  onClickAction?: () => void;
  className?: string;
  title: string;
}
export const CTAButton = ({
  isLoading,
  isDisabled,
  onClickAction,
  className = "",
  title = "Submit",
  ...props
}: CTAButtonProps) => {
  return (
    <Button
      className={className}
      disabled={isDisabled || isLoading}
      onClick={onClickAction}
      {...props}
    >
      {isLoading?(
        <span>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span className="hidden md:block">Please wait</span>
        </span>
      ):(
        <span>{title}</span>
      )}
    </Button>
  );
};