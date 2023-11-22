// global.d.ts
import { PrismaClient } from "@prisma/client";
import { SESCLient } from "@aws-sdk/client-ses"

declare global {
  var prisma: PrismaClient | undefined;
  var sesClient: SESClient | undefined;
}