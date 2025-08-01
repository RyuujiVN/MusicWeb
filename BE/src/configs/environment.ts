import "dotenv/config";

interface ENV {
  PORT: number | string;
  DATABASE_URL: string;
}

const env: ENV = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
};

export default env;
