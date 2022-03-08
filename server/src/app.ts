import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

const app = express();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
});

app.use(express.json());

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(cors());
app.use(routes);

app.use(Sentry.Handlers.errorHandler());
app.use(
    Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
            if (
                error.status === 400
                || error.status === 404
                || error.status === 500
            ) {
                return true;
            }
            return false;
        },
    })
);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof Error) {
            return response.status(400).json({
                message: err.message
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal server error."
        });
    }
);

export { app }