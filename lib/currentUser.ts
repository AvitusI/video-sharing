import { validateRequest } from "./auth";

export const currentUser = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  return user;
};
