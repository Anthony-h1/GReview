import { SignIn } from '@clerk/nextjs';

const signIn = () => {
  return <SignIn forceRedirectUrl={'/home'} />;
};

export default signIn;
