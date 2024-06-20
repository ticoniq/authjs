import Navbar from "./_components/Navbar";

interface ProctedLayoutProps {
  children: React.ReactNode;
}

const ProctedLayout = ({ children }: ProctedLayoutProps) => {
  return (
    <div className="h-full w-full py-5 flex flex-col gap-y-10 items-center justify-center bg-teal-500">
      <Navbar />
      {children}
    </div>
  );
};
export default ProctedLayout;