import { FormVerifyPasswordReset } from "@/components/sign/form-verify-password";
import { DataProvider } from "@/context/reset-password";

const Page: React.FC = () => {
  return (
    <>
      <DataProvider>
        <FormVerifyPasswordReset />
      </DataProvider>
    </>
  );
};

export default Page;
