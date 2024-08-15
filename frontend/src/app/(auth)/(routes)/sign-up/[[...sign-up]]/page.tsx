import { SignUp } from '@clerk/nextjs';

const signUp = () => {
  return <SignUp forceRedirectUrl={'/home'} />;
};

export default signUp;
