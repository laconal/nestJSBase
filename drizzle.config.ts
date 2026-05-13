import "dotenv/config"
import { defineConfig } from "drizzle-kit";
import { databaseModelSchemas } from "src/app.module";
export default defineConfig({
  schema: databaseModelSchemas,
  out: "./src/core/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});