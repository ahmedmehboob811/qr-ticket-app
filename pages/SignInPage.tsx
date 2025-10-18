
import { SignIn } from "@clerk/clerk-react";
import React from "react";

const SignInPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      {/* FIX: The 'path' prop is deprecated for the SignIn component in recent versions of @clerk/clerk-react. It has been removed as the path is now inferred from the router configuration. */}
      <SignIn routing="hash" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
