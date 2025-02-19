import { User } from "../../../types/user";

type Props = {
  user: User;
};
const UserDetails = ({ user }: Props) => {
  return (
    <div>
      <h1 className="text-2xl mb-4">{user.name}</h1>
      <UserDetail label="Username" value={user.username} />
      <UserDetail label="Email" value={user.email} />
      <UserDetail label="Phone" value={user.phone} />
      <UserDetail label="Website" value={user.website} />
      <UserDetail label="Company" value={user.company.name} />
      <UserDetail label="Address" value={user.address.street} />
      <UserDetail label="City" value={user.address.city} />
      <UserDetail label="Zipcode" value={user.address.zipcode} />
    </div>
  );
};

type UserInfoProps = {
  label: string;
  value: string;
};
const UserDetail = ({ label, value }: UserInfoProps) => {
  return (
    <div>
      <span className="font-semibold">{label}</span>: {value}
    </div>
  );
};

export default UserDetails;
