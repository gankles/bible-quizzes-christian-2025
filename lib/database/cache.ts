// Cache Layer for Bible API and Database Queries
// Uses in-memory cache with TTL for development, Redis/Upstash for production

interface CacheEntry<T> {
    data: T
    expiresAt: number
}

class CacheManager {
    private cache: Map<string, CacheEntry<any>>
    private defaultTTL: number

    constructor(defaultTTL: number = 86400000) { // 24 hours default
        this.cache = new Map()
        this.defaultTTL = defaultTTL

        // Clean up expired entries every hour
        setInterval(() => this.cleanup(), 3600000)
    }

    /**
     * Get cached value
     */
    async get<T>(key: string): Promise<T | null> {
        const entry = this.cache.get(key)

        if (!entry) {
            return null
        }

        // Check if expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key)
            return null
        }

        return entry.data as T
    }

    /**
     * Set cached value with TTL
     */
    async set<T>(key: string, data: T, ttl?: number): Promise<void> {
        const expiresAt = Date.now() + (ttl || this.defaultTTL)

        this.cache.set(key, {
            data,
            expiresAt,
        })
    }

    /**
     * Delete cached value
     */
    async delete(key: string): Promise<void> {
        this.cache.delete(key)
    }

    /**
     * Clear all cache
     */
    async clear(): Promise<void> {
        this.cache.clear()
    }

    /**
     * Get or set pattern (cache-aside)
     */
    async getOrSet<T>(
        key: string,
        fetcher: () => Promise<T>,
        ttl?: number
    ): Promise<T> {
        // Try to get from cache
        const cached = await this.get<T>(key)
        if (cached !== null) {
            return cached
        }

        // Fetch and cache
        const data = await fetcher()
        await this.set(key, data, ttl)

        return data
    }

    /**
     * Cleanup expired entries
     */
    private cleanup(): void {
        const now = Date.now()

        const entries = Array.from(this.cache.entries())
        for (const [key, entry] of entries) {
            if (now > entry.expiresAt) {
                this.cache.delete(key)
            }
        }
    }

    /**
     * Get cache stats
     */
    getStats(): {
        size: number
        keys: string[]
    } {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys()),
        }
    }
}

// Singleton instance
export const cache = new CacheManager()

// Cache key generators
export const cacheKeys = {
    verse: (book: string, chapter: number, verse: number, translation: string) =>
        `verse:${book}:${chapter}:${verse}:${translation}`,

    chapter: (book: string, chapter: number) =>
        `chapter:${book}:${chapter}`,

    book: (slug: string) =>
        `book:${slug}`,

    topic: (slug: string) =>
        `topic:${slug}`,

    character: (slug: string) =>
        `character:${slug}`,

    studyPlan: (slug: string) =>
        `study-plan:${slug}`,

    popularVerses: (limit: number) =>
        `popular-verses:${limit}`,

    relatedPages: (url: string, type: string) =>
        `related:${type}:${url}`,
}

// Cache TTLs (in milliseconds)
export const cacheTTL = {
    verse: 86400000,      // 24 hours
    chapter: 86400000,    // 24 hours
    book: 604800000,      // 7 days
    topic: 86400000,      // 24 hours
    character: 604800000, // 7 days
    studyPlan: 604800000, // 7 days
    analytics: 3600000,   // 1 hour
    sitemap: 86400000,    // 24 hours
}

export default cache
