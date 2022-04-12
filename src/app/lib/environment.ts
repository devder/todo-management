const environment = {
  isProduction: process.env.NODE_ENV! === "production",
  clientUrl: process.env.CLIENT_URL!,
};

export default environment;
