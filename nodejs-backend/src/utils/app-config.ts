import "dotenv/config";

class AppConfig {

    public readonly host = process.env.DB_HOST || "localhost";
    public readonly port = process.env.DB_PORT ? +process.env.DB_PORT : 3306;
    public readonly user = process.env.DB_USER || "root";
    public readonly password = process.env.DB_PASSWORD || requireEnv("DB_PASSWORD");
    public readonly database = process.env.DB_NAME || "vacation_site_project";
    public readonly secretKey = process.env.SECRET_KEY || requireEnv("SECRET_KEY");

}

function requireEnv(name: string): never {
    throw new Error(`Missing required environment variable: ${name}. Set it in a .env file or your shell.`);
}

export const appConfig = new AppConfig();
