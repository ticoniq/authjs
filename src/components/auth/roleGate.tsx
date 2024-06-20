"use client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from '@prisma/client';
import React, { Fragment } from 'react'
import { FormError } from "@/components/FormError";

interface roleGateProps {
  children: React.ReactNode
  allowedRoles: UserRole;
}

function RoleGate({
  children,
  allowedRoles
}: roleGateProps) {
  const role = useCurrentRole();
  if (role !== allowedRoles) {
    return (
      <FormError message={"You don't pamission to view this content"} />
    )
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default RoleGate