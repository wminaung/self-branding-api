export const configs = {
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  jwtSecret: process.env.JWT_SECRET || "hello",
};
