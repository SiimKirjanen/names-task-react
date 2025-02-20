import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../types/user";
import UserForm from "../UserForm/UserForm";
import { editUser } from "../../../api/user";

type Props = {
  user: User | null;
  onClose: () => void;
};
const UserEditModal = ({ user, onClose }: Props) => {
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      editUser(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) =>
        oldData
          ? oldData.map((u) =>
              u.id === variables.id ? { ...u, ...variables.data } : u
            )
          : []
      );

      queryClient.setQueryData(
        ["user", String(variables.id)],
        (oldData: User | undefined) =>
          oldData
            ? { ...oldData, ...variables.data }
            : { ...variables.data, id: variables.id }
      );

      onClose();
    },
  });

  if (user === null) {
    return null;
  }

  const handleUserEdit = async (data: Partial<User>) => {
    editMutation.mutate({ id: user.id, data });
  };

  return (
    <dialog
      id="user-edit-modal"
      className="modal"
      open={!!user}
      onClose={onClose}
    >
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg mb-2">Edit user</h3>
        <UserForm user={user} onSave={handleUserEdit} />
      </div>
      <form method="dialog" className="modal-backdrop bg-black opacity-80">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UserEditModal;
