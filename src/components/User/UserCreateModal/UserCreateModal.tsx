import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../types/user";
import UserForm from "../UserForm/UserForm";
import { createUser } from "../../../api/user";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const UserCreateModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) =>
        oldData ? [data, ...oldData] : [data]
      );
      queryClient.setQueryData(
        ["user", String(data.id)],
        (oldData: User | undefined) =>
          oldData ? { ...oldData, ...data } : { ...data }
      );
    },
  });

  const handleUserCreate = async (data: Omit<User, "id">) => {
    createMutation.mutate(data);
    onClose();
  };
  return (
    <dialog
      id="user-edit-modal"
      className="modal"
      open={isOpen}
      onClose={onClose}
    >
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg">Create new user</h3>
        <UserForm user={null} onSave={handleUserCreate} />
      </div>
      <form method="dialog" className="modal-backdrop bg-black opacity-80">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UserCreateModal;
