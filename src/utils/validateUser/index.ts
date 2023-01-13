import { users } from "./utils";

type userType = {
  user: string;
  date: string;
  name: string;
  lastName: string;
  alias: string;
  eslogan: string;
  isActive: boolean;
};

const validateUser = (user: string) => {
  if (user) {
    const result = users.map((item: userType) => {
      if (item.user === user && item.isActive) {
        return { err: false, isLogin: true, code: 200 };
      } else if (item.user === user && !item.isActive) {
        return { err: true, description: "User exist but is inactive", code: 401 };
      } else {
        return { err: true, description: "User dont exist", code: 401 };
      }
    });

    return result
  } else {
    return { err: true, description: "User required", code: 401 };
  }
};

export default validateUser;
