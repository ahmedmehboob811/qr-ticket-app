
import { SignUp } from "@clerk/clerk-react";
import React from "react";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      {/* FIX: The 'path' prop is deprecated for the SignUp component in recent versions of @clerk/clerk-react. It has been removed as the path is now inferred from the router configuration. */}
      <SignUp routing="hash" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
