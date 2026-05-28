class AppConfig {

}

class DevAppConfig extends AppConfig {
    serverAddress = "http://localhost:5000";
    apiAddress: string = this.serverAddress + "/api/";
    uploadsAddress: string = this.serverAddress + "/uploads/";
}

class ProdAppConfig extends AppConfig {
    serverAddress = process.env.REACT_APP_API_URL || "http://localhost:5000";
    apiAddress: string = this.serverAddress + "/api/";
    uploadsAddress: string = this.serverAddress + "/uploads/";
}

export const appConfig = process.env.NODE_ENV === "production" ? new ProdAppConfig() : new DevAppConfig;
