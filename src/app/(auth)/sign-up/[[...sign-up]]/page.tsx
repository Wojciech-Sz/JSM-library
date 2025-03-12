import { SignUp } from "@clerk/nextjs";

import ImageUpload from "@/components/ImageUpload";

export default function Page() {
  return (
    <>
      <SignUp />
      <ImageUpload />
    </>
  );
}
