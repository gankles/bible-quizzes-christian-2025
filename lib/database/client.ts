// Database Client Configuration
// Singleton pattern for Prisma Client to avoid connection exhaustion

import { PrismaClient } from '@prisma/client'

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

// Prisma Client instance with optimized configuration
export const prisma = global.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],

    // Connection pooling for production
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
})

// Prevent multiple instances in development (hot reload)
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma
}

// Graceful shutdown
if (process.env.NODE_ENV === 'production') {
    process.on('beforeExit', async () => {
        await prisma.$disconnect()
    })
}

export default prisma
