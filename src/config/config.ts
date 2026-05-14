import "dotenv/config";

interface Config {
    port: number;
    nodeEnv: string;
    databaseUrl: string;
    originUrl: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    originUrl: `${process.env.ORIGIN_URL}`,
    databaseUrl: `${process.env.DATABASE_URL}`,
};

export default config;
