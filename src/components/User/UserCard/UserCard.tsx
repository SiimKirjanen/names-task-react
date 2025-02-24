import { Link } from "react-router";
import { User } from "../../../types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../../api/user";
import { toast } from "react-toastify";

type Props = {
  user: User;
  editUser: (user: User) => void;
};
const UserCard = ({ user, editUser }: Props) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) =>
        oldData ? oldData.filter((u) => u.id !== user.id) : []
      );
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const handleUserDelete = () => {
    deleteMutation.mutate(user.id);
  };

  const handleUserEdit = () => {
    editUser(user);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body gap-1">
        <Link to={`/users/${user.id}`} className="font-bold text-xl">
          {user.name}
        </Link>
        <UserInfo label="Username" value={user.username} />
        <UserInfo label="Email" value={user.email} />
        <UserInfo label="Phone" value={user.phone} />
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-error" onClick={handleUserDelete}>
            Delete
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleUserEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

type UserInfoProps = {
  label: string;
  value: string;
};
const UserInfo = ({ label, value }: UserInfoProps) => {
  return (
    <div>
      <span className="font-semibold">{label}</span>: {value}
    </div>
  );
};

export default UserCard;
