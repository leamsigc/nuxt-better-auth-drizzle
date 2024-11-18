
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { tables, useDrizzle } from "./drizzle"

// Zod schema for tenant validation
export const insertTenantSchema = createInsertSchema(tables.tenants, {
    name: z.string().min(2).max(50),
    slug: z.string().min(2).max(50).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string().optional(),
    logo: z.string().url().optional(),
    theme: z.string().optional(),
    status: z.enum(['active', 'inactive']).default('active'),
});

export type InsertTenant = z.infer<typeof insertTenantSchema>;
export type Tenant = typeof tables.tenants.$inferSelect;

export class TenantService {
    // Create a new tenant
    static async create(data: InsertTenant): Promise<Tenant> {
        const newTenant = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const [tenant] = await useDrizzle().insert(tables.tenants).values(newTenant).returning();
        return tenant;
    }

    // Get all tables.tenants
    static async getAll(): Promise<Tenant[]> {
        return await useDrizzle().select().from(tables.tenants);
    }

    // Get a tenant by ID
    static async getById(id: number): Promise<Tenant | null> {
        const [tenant] = await useDrizzle()
            .select()
            .from(tables.tenants)
            .where(eq(tables.tenants.id, id));
        return tenant || null;
    }

    // Get a tenant by slug
    static async getBySlug(slug: string): Promise<Tenant | null> {
        const [tenant] = await useDrizzle()
            .select()
            .from(tables.tenants)
            .where(eq(tables.tenants.slug, slug));
        return tenant || null;
    }

    // Update a tenant
    static async update(id: number, data: Partial<InsertTenant>): Promise<Tenant | null> {
        const [tenant] = await useDrizzle()
            .update(tables.tenants)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(tables.tenants.id, id))
            .returning();
        return tenant || null;
    }

    // Delete a tenant
    static async delete(id: number): Promise<boolean> {
        const [deleted] = await useDrizzle()
            .delete(tables.tenants)
            .where(eq(tables.tenants.id, id))
            .returning();
        return !!deleted;
    }

    // Update tenant status
    static async updateStatus(id: number, status: 'active' | 'inactive'): Promise<Tenant | null> {
        return await this.update(id, { status });
    }

    // Check if slug is unique
    static async isSlugUnique(slug: string, excludeId?: number): Promise<boolean> {
        const query = useDrizzle()
            .select()
            .from(tables.tenants)
            .where(eq(tables.tenants.slug, slug));

        if (excludeId) {
            const [tenant] = await useDrizzle().select().from(tables.tenants).where(eq(tables.tenants.id, excludeId));
            return !tenant;
        }

        const [tenant] = await query;
        return !tenant;
    }
}
