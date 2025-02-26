import { z } from "zod";

const envSchema = z.object({
  BACKEND_URI: z.string().nonempty().min(1),
  SESSION_COOKIE: z.string().nonempty().min(4),
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error("❌ Error al cargar las variables de entorno, favor verificar el archivo .env ", error.format());
  process.exit(1);
}

export const { BACKEND_URI: api_basepath, SESSION_COOKIE: session_cookie_name } = data;
