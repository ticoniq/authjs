const layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="min-h-screen  min-w-screen flex flex-col justify-center items-center px-2 bg-teal-500">
      {children}
    </div>
  );
};
export default layout;