import jwt from "jsonwebtoken";

const SECRET_KEY = "yoursecretkey";

const verifyToken = (req: { headers: { [x: string]: unknown } }) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return { auth: false, message: "No token provided.", code: 401 };
  }
  const result = jwt.verify(token, SECRET_KEY, function (err: unknown) {
    if (err) {
      return {
        auth: false,
        message: "Failed to authenticate token.",
        code: 500,
      };
    } else {
      return { auth: true, message: "Token is valid.", code: 200 };
    }
  });
  return result;
};

export default verifyToken;
