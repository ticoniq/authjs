"use client";
import { useCallback, useEffect, useState } from "react";
import CardWrapper from "./cardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from 'next/navigation';
import { newVerification } from "@/actions/newVerification";
import { FormError } from '../FormError';
import { FormSuccess } from '../FormSuccess';

interface Props { }

function NewVerificationForm({ }: Props) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return; 
    
    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit();
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel={"Confirm your email address"}
      backButtonLabel={"Back to login"}
      backButtonLink={"/auth/login"}
    >
      <div className="flex flex-col space-y-5 items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        {!success && (
          <FormError message={error} />
        )}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm