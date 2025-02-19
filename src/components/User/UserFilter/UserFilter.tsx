import SearchInput from "../../common/Input/SearchInput";

type Props = {
  nameSearch: string;
  onNameSearchChange: (nameSearch: string) => void;
};
const UserFilter = ({ nameSearch, onNameSearchChange }: Props) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNameSearchChange(event.target.value);
  };
  return (
    <div className="flex flex-col gap-1 items-center">
      <SearchInput
        value={nameSearch}
        onChange={handleSearchChange}
        placeholder="Seach by name"
      />
    </div>
  );
};

export default UserFilter;
