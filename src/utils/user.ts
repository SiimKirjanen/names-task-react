import { User } from "../types/user";

export const filterUser = (user: User, nameSearch: string): boolean => {
  return user.name.toLowerCase().includes(nameSearch.toLowerCase());
};
