type Props = {
  children: React.ReactNode;
};
const Page = ({ children }: Props) => {
  return <div className="flex flex-col items-center gap-4 p-4">{children}</div>;
};

export default Page;
