import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
// import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// import routes from "./app/routes";
import httpStatus from "http-status";

app.use(cors());

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
// app.use("/api/v1/", routes);

//global error handler
// app.use(globalErrorHandler);

//Not Found Route Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

//test route

export default app;
