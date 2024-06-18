'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Social } from "./Social";
import BackButton from './BackButton';

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLink: string;
  showSocials?: boolean;
};
const CardWrapper = ({
  backButtonLabel,
  backButtonLink,
  children,
  headerLabel,
  showSocials,
}: Props) => {
  return (
    <Card className=" w-full max-w-[400px]">
      <CardHeader>
        <section className="w-full flex flex-col gap-y-4 items-center">
          <h1 className="text-3xl font-semibold font-mono">
            Auth
          </h1>
          <p className="text-muted-foreground text-sm">
            {headerLabel}
          </p>
        </section>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocials && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonLink}
        />
      </CardFooter>
    </Card>
  );
};
export default CardWrapper;