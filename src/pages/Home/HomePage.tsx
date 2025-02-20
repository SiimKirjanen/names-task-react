import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/user";
import { User } from "../../types/user";
import UserCard from "../../components/User/UserCard/UserCard";
import Page from "../Page";
import ErrorAlert from "../../components/common/Alert/ErrorAlert/ErrorAlert";
import Spinner from "../../components/common/Loading/Spinner/Spinner";
import UserFilter from "../../components/User/UserFilter/UserFilter";
import { useMemo, useState } from "react";
import { filterUser } from "../../utils/user";
import UserEditModal from "../../components/User/UserEditModal/UserEditModal";
import UserCreateModal from "../../components/User/UserCreateModal/UserCreateModal";
import WarningAlert from "../../components/common/Alert/WarningAlert/WarningAlert";

const HomePage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retry: 1,
    staleTime: Infinity,
  });
  const [nameSearch, setNameSearch] = useState("");
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const filteredUsers = useMemo(() => {
    return data
      ? data.filter((user: User) => filterUser(user, nameSearch))
      : [];
  }, [data, nameSearch]);

  if (isPending) {
    return (
      <Page>
        <Spinner />
      </Page>
    );
  }

  if (isError) {
    return (
      <Page>
        <ErrorAlert errorMessage={error.message} />
      </Page>
    );
  }

  if (data && data.length === 0) {
    return (
      <Page>
        <ErrorAlert errorMessage="No users" />
      </Page>
    );
  }

  return (
    <Page>
      <UserFilter nameSearch={nameSearch} onNameSearchChange={setNameSearch} />
      <button
        className="btn btn-success btn-sm"
        onClick={() => setNewUserModalOpen(true)}
      >
        Add User
      </button>
      {filteredUsers.length === 0 ? (
        <WarningAlert warningText="No users matching the search criteria" />
      ) : (
        filteredUsers.map((user: User) => (
          <UserCard
            key={user.id}
            user={user}
            editUser={(user) => {
              setUserToEdit(user);
            }}
          />
        ))
      )}
      <UserEditModal user={userToEdit} onClose={() => setUserToEdit(null)} />
      <UserCreateModal
        isOpen={newUserModalOpen}
        onClose={() => setNewUserModalOpen(false)}
      />
    </Page>
  );
};

export default HomePage;
