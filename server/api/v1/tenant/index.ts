import { TenantService, insertTenantSchema } from '~~/server/utils/tenant';
import { z } from 'zod';

// GET /api/v1/tenant
export default defineEventHandler(async (event) => {
    // Handle different HTTP methods
    const method = event.method;

    if (method === 'GET') {
        try {
            const tenants = await TenantService.getAll();
            return { tenants };
        } catch (error) {
            console.error('Error fetching tenants:', error);
            throw createError({
                statusCode: 500,
                message: 'Failed to fetch tenants'
            });
        }
    }

    if (method === 'POST') {
        try {
            const body = await readBody(event);
            const validatedData = insertTenantSchema.parse(body);

            // Check if slug is unique
            const isSlugUnique = await TenantService.isSlugUnique(validatedData.slug);
            if (!isSlugUnique) {
                throw createError({
                    statusCode: 400,
                    message: 'Slug must be unique'
                });
            }

            const tenant = await TenantService.create(validatedData);
            return { tenant };
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw createError({
                    statusCode: 400,
                    message: 'Invalid tenant data',
                    data: error.errors
                });
            }
            console.error('Error creating tenant:', error);
            throw createError({
                statusCode: 500,
                message: 'Failed to create tenant'
            });
        }
    }

    throw createError({
        statusCode: 405,
        message: 'Method not allowed'
    });
});
