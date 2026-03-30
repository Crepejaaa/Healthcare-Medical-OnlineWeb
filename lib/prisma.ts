import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL}`;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool as any);
  prisma = new PrismaClient({ adapter, log: ["query"] });
} else {
  if (!globalForPrisma.prisma) {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool as any);
    globalForPrisma.prisma = new PrismaClient({ adapter, log: ["query"] });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
