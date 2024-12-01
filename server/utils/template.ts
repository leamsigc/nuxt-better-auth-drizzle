import { eq, and } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { tables, useDrizzle } from "./drizzle";

// Create Zod schema for template insertion
export const insertTemplateSchema = createInsertSchema(tables.templates, {
    title: z.string().min(3),
    description: z.string(),
    slug: z.string(),
    tenantId: z.number(),
    categoryId: z.number(),
    features: z.string().optional(), // JSON array of features
    url: z.string().url(),
    sourceUrl: z.string().url().optional(),
    pricingType: z.enum(['free', 'paid', 'freemium']),
    price: z.number().optional(), // Price in cents if paid
    tags: z.string(), // JSON array of tags
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    createdAt: z.date().default(new Date()).optional(),
    updatedAt: z.date().default(new Date()).optional(),
});

export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof tables.templates.$inferSelect;

export class TemplateService {
    // Create a new template
    static async create(data: InsertTemplate): Promise<Template> {
        const db = useDrizzle();
        const now = new Date();

        const [newTemplate] = await db.insert(tables.templates)
            .values({
                ...data,
                createdAt: now,
                updatedAt: now,
            })
            .returning();
        return newTemplate;
    }

    // Get all templates
    static async getAll(): Promise<Template[]> {
        const db = await useDrizzle()
            .select()
            .from(tables.templates).
            orderBy(tables.templates.createdAt);
        return db
    }

    // Get templates by tenant ID
    static async getByTenant(tenantId: number): Promise<Template[]> {
        const db = await useDrizzle()
            .select()
            .from(tables.templates)
            .where(eq(tables.templates.tenantId, tenantId))
            .orderBy(tables.templates.createdAt);
        return db || [];
    }

    // Get single template by ID
    static async getById(id: number): Promise<Template | null> {
        const template = await useDrizzle()
            .select()
            .from(tables.templates)
            .where(eq(tables.templates.id, id));
        return template[0] || null;
    }

    // Get template by slug and tenant ID
    static async getBySlug(slug: string, tenantId: number): Promise<Template | null> {
        const template = await useDrizzle()
            .select()
            .from(tables.templates)
            .where(and(eq(tables.templates.slug, slug), eq(tables.templates.tenantId, tenantId)));
        return template[0] || null;
    }

    // Update template
    static async update(id: number, data: Partial<InsertTemplate>): Promise<Template | null> {
        const db = useDrizzle();
        const [updatedTemplate] = await db.update(tables.templates)
            .set({
                ...data,
                updatedAt: new Date()
            })
            .where(eq(tables.templates.id, id))
            .returning();
        return updatedTemplate || null;
    }

    // Delete template
    static async delete(id: number): Promise<boolean> {
        const db = useDrizzle();
        const [deletedTemplate] = await db.delete(tables.templates)
            .where(eq(tables.templates.id, id))
            .returning();
        return !!deletedTemplate;
    }
}
