
export default defineEventHandler(async (event) => {
    const method = event.method;
    const id = Number(event.context.params?.id);

    if (isNaN(id)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid template ID'
        });
    }

    // GET - Get single template
    if (method === 'GET') {
        const query = getQuery(event);

        // Get template by slug if provided
        if (query.slug && query.tenantId) {
            const template = await TemplateService.getBySlug(
                query.slug as string,
                Number(query.tenantId)
            );
            if (!template) {
                throw createError({
                    statusCode: 404,
                    message: 'Template not found'
                });
            }
            return { template };
        }

        // Get template by ID
        const template = await TemplateService.getById(id);
        if (!template) {
            throw createError({
                statusCode: 404,
                message: 'Template not found'
            });
        }
        return { template };
    }

    // PUT - Update template
    if (method === 'PUT') {
        const body = await readBody(event);

        try {
            const template = await TemplateService.update(id, body);
            if (!template) {
                throw createError({
                    statusCode: 404,
                    message: 'Template not found'
                });
            }
            return { template };
        } catch (error) {
            throw createError({
                statusCode: 400,
                message: 'Invalid template data'
            });
        }
    }

    // DELETE - Delete template
    if (method === 'DELETE') {
        const deleted = await TemplateService.delete(id);
        if (!deleted) {
            throw createError({
                statusCode: 404,
                message: 'Template not found'
            });
        }
        return { success: true };
    }

    throw createError({
        statusCode: 405,
        message: 'Method not allowed'
    });
});
