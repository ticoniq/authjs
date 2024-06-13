import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

function BackButton({
  href,
  label
}: BackButtonProps) {
  return (
    <Button
      size={"sm"}
      className="w-full"
      variant={"link"}
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}

export default BackButton