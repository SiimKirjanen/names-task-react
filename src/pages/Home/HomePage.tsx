import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/user";
import { User } from "../../types/user";
import UserCard from "../../components/User/UserCard/UserCard";
import Page from "../Page";
import ErrorAlert from "../../components/common/Alert/ErrorAlert/ErrorAlert";
import Spinner from "../../components/common/Loading/Spinner/Spinner";
import UserFilter from "../../components/User/UserFilter/UserFilter";
import { useState } from "react";
import { filterUser } from "../../utils/user";

const HomePage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retry: 1,
    staleTime: Infinity,
  });
  const [nameSearch, setNameSearch] = useState("");

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

  return (
    <Page>
      <UserFilter nameSearch={nameSearch} onNameSearchChange={setNameSearch} />
      {data
        .filter((user: User) => filterUser(user, nameSearch))
        .map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
    </Page>
  );
};

export default HomePage;
