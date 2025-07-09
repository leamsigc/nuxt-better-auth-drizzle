---
title: NuxtZzle Documentation View content components | From file structure to db schema
description: Nuxt 4, tailwind css, Better auth, Drizzle ORM| From file structure to db schema.

ogImage:
  component: Pergel
  props:
    title: NuxtZzle Documentation View content components
    description: Nuxt 4, tailwind css, Better auth, Drizzle ORM.
    heading: Nuxt 4

head:
  htmlAttrs:
    lang: en
  bodyAttrs:
    class: ""
  meta:
    - name: keywords
      content: NuxtZzle Documentation View content components| From file structure to db schema
    - name: robots
      content: index, follow
    - name: author
      content: NuxtZzle Documentation View content components| From file structure to db schema
    - name: description
      content: Base template for enterprise project Better Auth & Nuxt.
    - name: twitter:title
      content: NuxtZzle Documentation View content components| From file structure to db schema
    - name: twitter:card
      content: summary_large_image
    - name: twitter:title
      content: NuxtZzle Documentation View content components| From file structure to db schema
    - name: twitter:description
      content: Base template for enterprise project Better Auth & Nuxt.
---
::div{class="container prose mx-auto"}
  # Content Components

  Here are example renders of the Nuxt content components found in `app/components/content`, using the Nuxt Content MDC syntax:

  ::alert{type="info"}
  These are basic examples. Some components may require specific props or slots to render correctly. Refer to the component's source code for detailed usage.
  ::

  ## Benefits

  ```md
  ::Benefits
  ---
  list:
    - icon: "blocks"
      title: "Example Benefit 1"
      description: "Description for example benefit 1."
    - icon: "sparkle"
      title: "Example Benefit 2"
      description: "Description for example benefit 2."
  ---
  #title
  Our Amazing Benefits

  #subtitle
  Unlock Your Potential

  #description
  Discover how our features can transform your workflow.
  ::
  ```
::
::Benefits
---
list:
  - icon: "blocks"
    title: "Example Benefit 1"
    description: "Description for example benefit 1."
  - icon: "sparkle"
    title: "Example Benefit 2"
    description: "Description for example benefit 2."
---
#title
Our Amazing Benefits

#subtitle
Unlock Your Potential

#description
Discover how our features can transform your workflow.
::


::div{class="container prose mx-auto py-24 sm:py-32"}
  ## BlogFeatured

  ```md
  ::BlogFeatured
  ::
  ```
::
::BlogFeatured
::

::div{class="container prose mx-auto py-24 sm:py-32"}
  ## BlogHero

  ```md
  ::BlogHero
  ::
  ```
::

---

::div{class="container prose mx-auto py-24 sm:py-32"}
  ## BlogList

  ```md
  ::BlogList
  ::
  ```
::BlogList
::

::div{class="container prose mx-auto py-24 sm:py-32"}

  ## BlueSkyComment

  ```md
  ::BlueSkyComment
  ---
  thread:
    post:
      author:
        handle: "example"
        displayName: "Example User"
        did: "did:plc:example"
      record:
        text: "This is an example comment."
        createdAt: "2023-01-01T12:00:00Z"
      uri: "at://did:plc:example/app.bsky.feed.post/example"
    isReply: false
    replies: []
  ---
  ::
  ```
::

::div{class="container prose mx-auto py-24 sm:py-32"}
  ## BlueSkyComments

  ```md
  ::BlueSkyComments
  ---
  url: "https://bsky.app/profile/bsky.app/post/3jqn24234234"
  ---
  #title
  Discussion Section

  #subtitle
  Join the conversation!
  ::
  ```
::
::div{class="container prose mx-auto py-24 sm:py-32"}
  ## Comments

  ```md
  ::Comments
  ---
  url: "https://bsky.app/profile/bsky.app/post/3jqn24234234"
  ---
  ::
  ```
::
::div{class="container prose mx-auto py-24 sm:py-32"}
  ## Community

  ```md
  ::Community
  ---
  icon: "lucide:github"
  url: "https://github.com/leamsigc"
  label: "Join our GitHub"
  ---
  #title
  Become part of our
  <span class="gradient-text">Developer Community</span>

  #content
  Connect with other developers, share your projects, and get support.
  ::
  ```
::
::div{class="container prose mx-auto py-24 sm:py-32"}
  ## ConButton

  ```md
  ::ConButton
  ---
  variant: "default"
  size: "lg"
  ---
  Click Me
  ::
  ```
::
::div{class="container prose mx-auto py-24 sm:py-32"}`
  ## Contact

  ```md
  ::Contact
  ::
  ```

  ## FAQ

  ```md
  ::FAQ
  ---
  list:
    - question: "What is Nuxt?"
      answer: "Nuxt is an open-source framework that makes web development simple and powerful."
      value: "item-1"
    - question: "How to install?"
      answer: "You can install it via npm or yarn."
      value: "item-2"
  ---
  #title
  Frequently Asked Questions

  #subtitle
  Your Questions Answered
  ::
  ```
::
::div{class="container prose mx-auto py-24 sm:py-32"}
  ## Features

  ```md
  ::Features
  ---
  list:
    - icon: "tabletSmartphone"
      title: "Responsive Design"
      description: "Adapts to any screen size."
    - icon: "badgeCheck"
      title: "High Performance"
      description: "Optimized for speed."
  ---
  #title
  Key Features

  #subtitle
  Why Choose Us?

  #description
  Explore the powerful features that set our platform apart.
  ::
  ```
::

## Hero

```md
::Hero
---
badge:
  label: New
  content: Design is out
actions:
  - label: Get Started
    href: /register
    icon: "lucide:arrow-right"
  - label: Documentation
    href: /docs
    variant: outline
heroImage:
  light: "img/hero-image-light.jpg"
  dark: "img/hero-image-dark.jpg"
  alt: "Dashboard using shadcn-vue and nuxt4"
---
#title
Experience the
<span class="gradient-text">Shadcn/Vue </span>
landing page

#description
We're more than just a tool, we're a community of passionate creators. Get
access to exclusive resources, tutorials, and support.
::
```

## HeroB

```md
::HeroB
---
#title
Our Awesome Blog
::
```

## HowItWorks

```md
::HowItWorks
---
list:
  - badgeTitle: "Step 1"
    title: "Sign Up Easily"
    description: "Create your account in a few simple steps."
    image: "roboto.png"
  - badgeTitle: "Step 2"
    title: "Configure Your Settings"
    description: "Customize your preferences to get started."
    image: "runner.png"
---
#title
Our Process

#subtitle
Simple Steps to Success
::
```

## Marquee

```md
::Marquee
---
pauseOnHover: true
vertical: false
repeat: 3
---
<div>Item 1</div>
<div>Item 2</div>
<div>Item 3</div>
<div>Item 4</div>
::
```

## Navbar

```md
::Navbar
::
```

## NotFoundView

```md
::NotFoundView
---
statusCode: 404
message: "Page Not Found"
---
::
```

## Pricing

```md
::Pricing
---
plans:
  - title: "Basic"
    popular: 0
    price: 10
    description: "Perfect for small teams."
    buttonText: "Choose Basic"
    benefitList:
      - "5 Users"
      - "10 GB Storage"
  - title: "Pro"
    popular: 1
    price: 50
    description: "Ideal for growing businesses."
    buttonText: "Go Pro"
    benefitList:
      - "Unlimited Users"
      - "100 GB Storage"
---
#title
Our Pricing Plans

#subtitle
Find the Perfect Plan for You

#description
Flexible pricing options to suit every need, from individuals to large enterprises.
::
```

## ReviewCard

```md
::ReviewCard
---
img: "https://i.pravatar.cc/250?img=60"
name: "Jane Doe"
username: "@janedoe"
body: "This product exceeded my expectations!"
---
::
```

## Services

```md
::Services
---
list:
  - title: "Web Development"
    description: "Building modern and responsive web applications."
    pro: 0
  - title: "Mobile App Development"
    description: "Creating native and cross-platform mobile apps."
    pro: 1
---
#title
Our Services

#subtitle
What We Offer

#description
Comprehensive solutions to help your business thrive in the digital age.
::
```

## ShinyCard

```md
::ShinyCard
---
showBg: true
---
### This is a Shiny Card
<p>Content goes here.</p>
::
```

## Sponsors

```md
::Sponsors
---
reviews:
  - name: "Company A"
    username: "@companya"
    body: "Proud to sponsor this amazing project!"
    img: "https://i.pravatar.cc/250?img=1"
  - name: "Company B"
    username: "@companyb"
    body: "Supporting innovation and growth."
    img: "https://i.pravatar.cc/250?img=2"
---
::
```

## Team

```md
::Team
---
list:
  - imageUrl: "https://i.pravatar.cc/250?img=68"
    firstName: "Alice"
    lastName: "Smith"
    positions: ["Lead Developer"]
    socialNetworks:
      - name: "Github"
        url: "https://github.com/alice"
  - imageUrl: "https://i.pravatar.cc/250?img=69"
    firstName: "Bob"
    lastName: "Johnson"
    positions: ["UI/UX Designer"]
    socialNetworks:
      - name: "LinkedIn"
        url: "https://linkedin.com/in/bob"
---
#title
Meet Our Team

#subtitle
The Visionaries Behind Our Success
::
```

## Testimonials

```md
::Testimonials
---
list:
  - image: "https://github.com/shadcn.png"
    name: "Client One"
    userName: "CEO, Tech Solutions"
    comment: "Absolutely fantastic product, highly recommend!"
    rating: 5.0
  - image: "https://github.com/shadcn.png"
    name: "Client Two"
    userName: "Founder, Innovate Co."
    comment: "Transformed our business operations."
    rating: 4.9
---
#title
What Our Clients Say

#subtitle
Trusted by Industry Leaders
::
```

## TheFooter

```md
::TheFooter
::
```

## ToggleTheme

```md
::ToggleTheme
::
```

## TyndallEffect

```md
::TyndallEffect
---
streak-color: "#00FF00"
---
### Content inside Tyndall Effect
<p>This area is affected by the visual effect.</p>
::
```

## UiConfettiContainer

```md
::UiConfettiContainer
---
confetti: "firework"
---
::
