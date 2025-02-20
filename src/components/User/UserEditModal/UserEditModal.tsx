import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../types/user";
import UserForm from "../UserForm/UserForm";
import { editUser } from "../../../api/user";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  user: User | null;
  onClose: () => void;
};
const UserEditModal = ({ user, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      editUser(id, data),
    onMutate: () => {
      setIsEditing(true);
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) =>
        oldData
          ? oldData.map((u) => (u.id === user!.id ? { ...u, ...data } : u))
          : []
      );

      queryClient.setQueryData(
        ["user", String(data.id)],
        (oldData: User | undefined) =>
          oldData ? { ...oldData, ...data } : { ...data }
      );

      setIsEditing(false);
      onClose();
      toast.success("User updated successfully");
    },
    onError: () => {
      setIsEditing(false);
    },
  });

  if (user === null) {
    return null;
  }

  const handleUserEdit = (data: Partial<User>) => {
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
        <UserForm user={user} onSave={handleUserEdit} isSaving={isEditing} />
      </div>
      <form method="dialog" className="modal-backdrop bg-black opacity-80">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UserEditModal;
