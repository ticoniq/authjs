'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import { Social } from "./Social";
import BackButton from './BackButton';

type Props = {
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
        <Header label={headerLabel} />
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