ALTER TABLE `account` RENAME COLUMN "expiresAt" TO "accessTokenExpiresAt";--> statement-breakpoint
ALTER TABLE `account` ADD `refreshTokenExpiresAt` integer;--> statement-breakpoint
ALTER TABLE `account` ADD `scope` text;--> statement-breakpoint
ALTER TABLE `account` ADD `createdAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `account` ADD `updatedAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `token` text NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `createdAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `updatedAt` integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
ALTER TABLE `verification` ADD `createdAt` integer;--> statement-breakpoint
ALTER TABLE `verification` ADD `updatedAt` integer;