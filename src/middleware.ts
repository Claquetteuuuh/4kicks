import { NextMiddleware } from "next/server";
import { stackMiddlewares } from "@/middlewares/stackHandler";
import { withConnection } from "@/middlewares/withConnection";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

const middlewares = [withConnection];
export default stackMiddlewares(middlewares);
