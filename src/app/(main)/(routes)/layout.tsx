import { auth } from '@clerk/nextjs/server';

const Main = ({ children }: { children: React.ReactNode }) => {
  auth().protect();
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default Main;
