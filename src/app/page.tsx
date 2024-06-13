import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <section className="h-screen flex justify-center items-center bg-teal-500">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold font-mono text-white drop-shadow-md">
          Auth
        </h1>
        <p className="text-white text-lg">
          A simple authetication service
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </section>
  )
}
