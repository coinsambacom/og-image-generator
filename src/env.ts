import { num, cleanEnv } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: num(),
});
