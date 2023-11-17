// global.d.ts
import { PrismaClient } from "@prisma/client";
import Mailjet from "node-mailjet";

declare global {
  var prisma: PrismaClient | undefined;
  var mailer: Mailjet | undefined;
}