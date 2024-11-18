import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tools = sqliteTable("tool", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	url: text("url"),
	description: text("description"),
	likes: integer("likes"),
	tags: text("tags"),
	pricing: text("pricing"),
	imageUrl: text("image_url"),
});

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	firstName: text('firstName'),
	lastName: text('lastName'),
	email: text('email').notNull().unique(),
	emailVerified: integer('emailVerified', {
		mode: "boolean"
	}).notNull(),
	image: text('image'),
	createdAt: integer('createdAt', {
		mode: "timestamp"
	}).notNull(),
	updatedAt: integer('updatedAt', {
		mode: "timestamp"
	}).notNull()
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: integer('expiresAt', {
		mode: "timestamp"
	}).notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId').notNull().references(() => user.id)
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId').notNull().references(() => user.id),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	expiresAt: integer('expiresAt', {
		mode: "timestamp"
	}),
	password: text('password')
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: integer('expiresAt', {
		mode: "timestamp"
	}).notNull()
});

// Tenants table to manage different directories (e.g., Tailwind, Bootstrap, etc.)
export const tenants = sqliteTable("tenant", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(), // URL-friendly name
	description: text("description"),
	logo: text("logo_url"),
	theme: text("theme"), // Custom theme settings as JSON
	status: text("status").notNull().default("active"), // active, inactive
	createdAt: integer('createdAt', { mode: "timestamp" }).notNull(),
	updatedAt: integer('updatedAt', { mode: "timestamp" }).notNull()
});

// Categories within each tenant (e.g., Landing Pages, Dashboards, etc.)
export const categories = sqliteTable("category", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	tenantId: integer("tenant_id").notNull().references(() => tenants.id),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	description: text("description"),
	order: integer("order").notNull(),
	createdAt: integer('createdAt', { mode: "timestamp" }).notNull(),
	updatedAt: integer('updatedAt', { mode: "timestamp" }).notNull()
});

// Templates table with pricing type and tenant relationship
export const templates = sqliteTable("template", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	tenantId: integer("tenant_id").notNull().references(() => tenants.id),
	categoryId: integer("category_id").notNull().references(() => categories.id),
	title: text("title").notNull(),
	slug: text("slug").notNull(),
	description: text("description").notNull(),
	features: text("features"), // JSON array of features
	url: text("url").notNull(), // Demo URL
	sourceUrl: text("source_url"), // GitHub or download URL
	pricingType: text("pricing_type").notNull(), // free, paid, freemium
	price: integer("price"), // Price in cents if paid
	tags: text("tags").notNull(), // JSON array of tags
	status: text("status").notNull().default("draft"), // draft, published, archived
	createdAt: integer('createdAt', { mode: "timestamp" }).notNull(),
	updatedAt: integer('updatedAt', { mode: "timestamp" }).notNull()
});

// Template images with order
export const templateImages = sqliteTable("template_image", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	templateId: integer("template_id").notNull().references(() => templates.id),
	imageUrl: text("image_url").notNull(),
	altText: text("alt_text"),
	order: integer("order").notNull(),
	type: text("type").notNull(), // thumbnail, preview, detail
	createdAt: integer('createdAt', { mode: "timestamp" }).notNull()
});

// Promoted templates for each tenant
export const promotedTemplates = sqliteTable("promoted_template", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	tenantId: integer("tenant_id").notNull().references(() => tenants.id),
	templateId: integer("template_id").notNull().references(() => templates.id),
	startDate: integer('start_date', { mode: "timestamp" }).notNull(),
	endDate: integer('end_date', { mode: "timestamp" }),
	priority: integer("priority").notNull().default(0), // Higher number = higher priority
	status: text("status").notNull().default("active"), // active, inactive
	createdAt: integer('createdAt', { mode: "timestamp" }).notNull(),
	updatedAt: integer('updatedAt', { mode: "timestamp" }).notNull()
});

// Template statistics for analytics
export const templateStats = sqliteTable("template_stats", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	templateId: integer("template_id").notNull().references(() => templates.id),
	views: integer("views").notNull().default(0),
	downloads: integer("downloads").notNull().default(0),
	likes: integer("likes").notNull().default(0),
	lastViewedAt: integer('last_viewed_at', { mode: "timestamp" }),
	updatedAt: integer('updatedAt', { mode: "timestamp" }).notNull()
});