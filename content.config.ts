import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'


import { asSeoCollection } from '@nuxtjs/seo/content'

const linkZodDefinition = z.object({
    name: z.string(),
    href: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    target: z.string().optional()
})


const mainLink = linkZodDefinition.and(
    z.object({
        children: z.array(linkZodDefinition.and(
            z.object({ children: z.array(linkZodDefinition.optional()) })
        )).optional()
    })
);
export const collections = {
    content: defineCollection(asSeoCollection({
        type: 'page',
        source: {
            include: '**/*.md',
            exclude: ['nav/**.yml']
        },
        schema: z.object({
            layout: z.enum(['default', 'blog-layout']).default('blog-layout'),
            title: z.string(),
            description: z.string(),
            image: z.object({
                src: z.string(),
                alt: z.string()
            }),
            date: z.string(),
            publishedAt: z.string(),
            category: z.string(),
            tags: z.array(z.string()),
            featured: z.boolean().default(false),
            head: z.object({
                meta: z.array(z.object({
                    name: z.string(),
                    content: z.string()
                })),
                htmlAttrs: z.object({
                    lang: z.string()
                }).optional(),
                bodyAttrs: z.object({
                    class: z.string()
                }).optional(),
            }),
            author: z.object({
                name: z.string(),
                role: z.string(),
                avatar: z.string(),
                social: z.string()
            }),
            ogImage: z.object({
                component: z.enum(['BlogOgImage', 'Video']).default('BlogOgImage'),
                props: z.object({
                    title: z.string(),
                    description: z.string(),
                    image: z.string()
                })
            })
        })
    })),
    navigation: defineCollection(asSeoCollection({
        type: 'data',
        source: 'nav/**.yml',
        schema: z.object({
            siteMeta: z.object({
                title: z.string(),
                logo: z.string(),
                logoAlt: z.string(),
            }),
            headerLinks: z.object({
                MenuLinks: z.array(
                    mainLink
                ),
                ShortLinks: z.array(linkZodDefinition),
                SocialMedia: z.array(linkZodDefinition),
                Actions: z.array(linkZodDefinition.and(
                    z.object({
                        label: z.string().optional()
                    })
                ))
            }),
            footerLinks: z.array(z.object({
                title: z.string(),
                links: z.array(z.object({
                    name: z.string(),
                    url: z.string(),
                    icon: z.string().optional()
                }))
            }))
        })
    }))
}