"use client";

import UserInfo from "@/components/auth/userInfo";
import { useCurrentUser } from "@/hooks/userCurrentUser";

function ClientPage() {
  const user = useCurrentUser();

  return (
    <UserInfo
      user={user}
      label="Client component"
    />
  )
}

export default ClientPage