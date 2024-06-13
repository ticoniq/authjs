import React from 'react'

interface HeaderProps {
  label: string;
}

export function Header({label}: HeaderProps) {
  return (
    <section className="w-full flex flex-col gap-y-4 items-center">
      <h1 className="text-3xl font-semibold font-mono">
        Auth
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </section>
  )
}