const CLIENT_URL = "http://localhost:3000";

const environment = {
  clientUrl: CLIENT_URL,
  jwtKey: process.env.JWT_KEY!,
};

export default environment;
