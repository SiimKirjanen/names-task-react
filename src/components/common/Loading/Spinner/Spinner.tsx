type Props = {
  className?: string;
};
const Spinner = ({ className = "" }: Props) => {
  return (
    <span className={`loading loading-spinner loading-lg ${className}`}></span>
  );
};

export default Spinner;
