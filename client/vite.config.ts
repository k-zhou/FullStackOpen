import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig( ({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Something about not recommended exposing all env variables
  // "process.env": env
  return {
    define: {
      "process.env.PORT" : env.PORT,
      "process.env.PUBLIC_API_URL": JSON.stringify(env.PUBLIC_API_URL),
    },
    plugins: [react()],
  }
});
