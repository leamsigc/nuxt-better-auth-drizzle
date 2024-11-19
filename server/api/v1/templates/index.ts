
export default defineEventHandler(async (event) => {
    const method = event.method;

    // GET - Get all templates
    if (method === 'GET') {
        const query = getQuery(event);

        // Get templates by tenant
        if (query.tenantId) {
            const templates = await TemplateService.getByTenant(Number(query.tenantId));
            return { templates };
        }

        // Get all templates
        const templates = await TemplateService.getAll();
        return { templates };
    }

    // POST - Create new template
    if (method === 'POST') {
        const body = await readBody(event);

        try {
            const data = insertTemplateSchema.parse(body);
            const template = await TemplateService.create(data);
            return { template };
        } catch (error) {
            throw createError({
                statusCode: 400,
                message: 'Invalid template data'
            });
        }
    }

    throw createError({
        statusCode: 405,
        message: 'Method not allowed'
    });
});
