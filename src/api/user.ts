import { USER_API } from "../constants";
import { User } from "../types/user";
import { generateRandomUserId } from "../utils/user";

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
    body: JSON.stringify({ ...data, id }),
  });
  if (!response.ok) {
    throw new Error("Failed to edit user");
  }

  return response.json();
};

const createUser = async (data: Omit<User, "id">) => {
  const newUserId = generateRandomUserId();
  const response = await fetch(USER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, id: newUserId }),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const createdUser = await response.json();
  return { ...createdUser, id: newUserId };
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
