import { cleanEnv, port } from "envalid";

interface ValidateEnvType {
  VITE_PORT: number;
}

export function ValidateEnv(): ValidateEnvType {
  return cleanEnv(import.meta.env, {
    VITE_PORT: port(),
  });
}
