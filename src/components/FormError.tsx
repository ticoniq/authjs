import { TriangleAlertIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
};

export function FormError({message}: FormErrorProps) {
  if (!message) return null;
  
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex item-center gap-x-2 text-sm text-destructive">
      <TriangleAlertIcon size={16} />
      <span>{message}</span>
    </div>
  )
};