import { FormVerifyPasswordReset } from "@/components/sign/form-verify-password";
import { Suspense } from "react";

const Page: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FormVerifyPasswordReset />
      </Suspense>
    </>
  );
};

export default Page;
