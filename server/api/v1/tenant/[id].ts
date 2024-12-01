
import { z } from 'zod';
import { TemplateService } from '~~/server/utils/template';
import { insertTenantSchema, TenantService } from '~~/server/utils/tenant';

export default defineEventHandler(async (event) => {

    // Check the query parameters
    const query = getQuery(event);

    if (query.slug) {
        const tenant = await TenantService.getBySlug(query.slug as string);
        if (!tenant) {
            throw createError({
                statusCode: 404,
                message: 'Tenant not found'
            });
        }
        const templates = await TemplateService.getByTenant(tenant.id);

        return {
            tenant,
            templates
        };
    }

    const id = Number(event.context.params?.id);
    if (isNaN(id)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid tenant ID'
        });
    }

    const method = event.method;

    // GET /api/v1/tenant/[id]
    if (method === 'GET') {
        try {
            const tenant = await TenantService.getById(id);
            if (!tenant) {
                throw createError({
                    statusCode: 404,
                    message: 'Tenant not found'
                });
            }
            return { tenant };
        } catch (error) {
            console.error('Error fetching tenant:', error);
            throw error;
        }
    }

    // PUT /api/v1/tenant/[id]
    if (method === 'PUT' || method === 'PATCH') {
        try {
            const body = await readBody(event);
            const validatedData = insertTenantSchema.partial().parse(body);

            // If slug is being updated, check if it's unique
            if (validatedData.slug) {
                const isSlugUnique = await TenantService.isSlugUnique(validatedData.slug, id);
                if (!isSlugUnique) {
                    throw createError({
                        statusCode: 400,
                        message: 'Slug must be unique'
                    });
                }
            }

            const tenant = await TenantService.update(id, validatedData);
            if (!tenant) {
                throw createError({
                    statusCode: 404,
                    message: 'Tenant not found'
                });
            }

            return { tenant };
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw createError({
                    statusCode: 400,
                    message: 'Invalid tenant data',
                    data: error.errors
                });
            }
            console.error('Error updating tenant:', error);
            throw error;
        }
    }

    // DELETE /api/v1/tenant/[id]
    if (method === 'DELETE') {
        try {
            const success = await TenantService.delete(id);
            if (!success) {
                throw createError({
                    statusCode: 404,
                    message: 'Tenant not found'
                });
            }

            return { success: true };
        } catch (error) {
            console.error('Error deleting tenant:', error);
            throw error;
        }
    }

    throw createError({
        statusCode: 405,
        message: 'Method not allowed'
    });
});
