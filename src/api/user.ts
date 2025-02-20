import { USER_API } from "../constants";
import { User } from "../types/user";

const fetchUsers = async () => {
  const response = await fetch(USER_API);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const fetchUser = async (id: number) => {
  const response = await fetch(`${USER_API}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

const editUser = async (id: number, data: Partial<User>) => {
  const response = await fetch(`${USER_API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to edit user");
  }

  return response.json();
};

const createUser = async (data: Omit<User, "id">) => {
  const response = await fetch(USER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

const deleteUser = async (id: number) => {
  const response = await fetch(`${USER_API}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};

export { fetchUsers, fetchUser, editUser, deleteUser, createUser };
