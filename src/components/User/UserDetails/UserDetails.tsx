import { User } from "../../../types/user";

type Props = {
  user: User;
};
const UserDetails = ({ user }: Props) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body gap-1">
        <h1 className="text-2xl mb-4">{user.name}</h1>
        <UserDetail label="Username" value={user.username} />
        <UserDetail label="Email" value={user.email} />
        <UserDetail label="Phone" value={user.phone} />
        <UserDetail label="Website" value={user.website} />
        <UserDetail label="Address" value={user.address.street} />
        <UserDetail label="City" value={user.address.city} />
        <UserDetail label="Zipcode" value={user.address.zipcode} />
        <UserDetail
          label="Geo"
          value={`${user.address.geo.lat}, ${user.address.geo.lng}`}
        />
        <UserDetail label="Company" value={user.company.name} />
        <UserDetail label="Catchphrase" value={user.company.catchPhrase} />
        <UserDetail label="Bs" value={user.company.bs} />
      </div>
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
