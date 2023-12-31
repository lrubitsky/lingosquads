import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import languageGroupsRouter from "./api/v1/languageGroupsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import participationsRouter from "./api/v1/participationsRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/language-groups", languageGroupsRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/participations", participationsRouter);

export default rootRouter;
