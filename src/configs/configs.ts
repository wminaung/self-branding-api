interface Config {
  saltRounds: number;
  jwtSecret: any;
  databaseUrl: string;
}

export const configs: Config = {
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  jwtSecret: process.env.JWT_SECRET || "hello",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:root@localhost:5432/personal_branding_db",
};
