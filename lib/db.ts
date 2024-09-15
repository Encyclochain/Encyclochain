import { PrismaClient } from "@prisma/client";

/*Prisma client singleton declaration file.
Best practice when working with PrismaDB.
You should NEVER declare another PrismaDB client*/

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;