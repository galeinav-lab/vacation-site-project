import express from 'express';
import cors from "cors";
import {authController} from "./controllers/auth-controller";
import {loggerMiddleware} from "./middleware/logger-middleware";
import {errorMiddleware} from "./middleware/error-middleware";
import {vacationController} from "./controllers/vacation-controller";
import {userController} from "./controllers/user-controller";
import {userVacationController} from "./controllers/user-vacation-controller";

class App {

    public start(): void {
        const server = express();

        server.use(cors());

        server.use(express.json());

        server.use("/uploads", express.static("uploads"));

        server.use(loggerMiddleware.consoleLog);

        server.use(authController.router);
        server.use(vacationController.router);
        server.use(userController.router)
        server.use(userVacationController.router)

        server.use(errorMiddleware.routeNotFound);
        server.use(errorMiddleware.catchAll);

        server.listen(5000, () => console.log("Success!"));
    }

}

const app = new App();
app.start();
