import { User } from "../types/user";

const filterUser = (user: User, nameSearch: string): boolean => {
  return user.name.toLowerCase().includes(nameSearch.toLowerCase());
};

const generateRandomUserId = (): number => {
  const min = 1000000000;
  const max = 9999999999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { filterUser, generateRandomUserId };
