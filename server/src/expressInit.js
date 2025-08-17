import expressSession from "express-session";
import { setupPassport } from "./utils/passport.js";
import passport from "passport";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

setupPassport();

export default function expressInit(app) {

  app.use(
    expressSession({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
      },
      secret: process.env.SESSION_SECRET ||
        "6907e5e5ba254bd519e1c56d0e57aa1983aae626d47714f0053ee498169339e2",
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
        new PrismaClient(),
        {
          checkPeriod: 2 * 60 * 1000,  //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }
      )
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
