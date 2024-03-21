interface Config {
  saltRounds: number;
  jwtSecret: any;
}

export const configs: Config = {
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  jwtSecret: process.env.JWT_SECRET || "hello",
};
