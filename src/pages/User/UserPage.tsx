import { useQuery } from "@tanstack/react-query";
import Page from "../Page";
import { fetchUser } from "../../api/user";
import { useParams } from "react-router";
import Spinner from "../../components/common/Loading/Spinner/Spinner";
import ErrorAlert from "../../components/common/Alert/ErrorAlert/ErrorAlert";
import UserDetails from "../../components/User/UserDetails/UserDetails";

const UserPage = () => {
  const { id } = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(Number(id)),
    enabled: !!id,
    retry: 1,
    staleTime: Infinity,
  });

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
      <UserDetails user={data} />
    </Page>
  );
};

export default UserPage;
