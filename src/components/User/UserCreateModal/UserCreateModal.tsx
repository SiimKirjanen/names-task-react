import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../types/user";
import UserForm from "../UserForm/UserForm";
import { createUser } from "../../../api/user";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const UserCreateModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const createMutation = useMutation({
    mutationFn: createUser,
    onMutate: () => {
      setIsCreating(true);
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) =>
        oldData ? [data, ...oldData] : [data]
      );
      queryClient.setQueryData(
        ["user", String(data.id)],
        (oldData: User | undefined) =>
          oldData ? { ...oldData, ...data } : { ...data }
      );
      setIsCreating(false);
      onClose();
      toast.success("User created successfully");
    },
    onError: () => {
      setIsCreating(false);
      toast.error("Failed to create user");
    },
  });

  const handleUserCreate = (data: Omit<User, "id">, reset: () => void) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
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
        <UserForm user={null} onSave={handleUserCreate} isSaving={isCreating} />
      </div>
      <form method="dialog" className="modal-backdrop bg-black opacity-80">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UserCreateModal;
