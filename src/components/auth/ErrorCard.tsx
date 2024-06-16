import CardWrapper from "./cardWrapper";
import { ShieldAlert } from "lucide-react";

export function ErrorCard() {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong"
            backButtonLabel="Back to login"
            backButtonLink="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                <ShieldAlert className="text-destructive" />
            </div>
        </CardWrapper>
    );
};