import { CheckCircleIcon } from "lucide-react";

interface FormSuccess {
  message?: string;
};

export function FormSuccess({message}: FormSuccess) {
  if (!message) return null;
  
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex item-center gap-x-2 text-sm text-emerald-500">
      <CheckCircleIcon size={16} />
      <span>{message}</span>
    </div>
  )
};