
import type { InferSelectModel } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export * from "./auth/auth";
/***
* Custom table here 
**/
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

