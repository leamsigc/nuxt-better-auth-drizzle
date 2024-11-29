---
title: "nav"
logo: "/logo.png"
logoAlt: "NuxtZzle Logo"
MenuLinks:
  - name: "Features"
    href: "#features"
    image: "https://www.radix-vue.com/logo.svg"
    children:
      - name: "Free tools"
        href: "/tools/free"
        children:
          - name: "Ai tools"
            description: "Best free AI tools."
            icon: "lucide:flag"
            href: "/tools/category/ai"
          - name: "Video Editing"
            description: "Best free Video Editing tools."
            icon: "lucide:briefcase"
            href: "/tools/category/video"
          - name: "Image Editing"
            description: "Best free Image Editing tools."
            icon: "lucide:mail"
            href: "/tools/category/image"
      - name: "Paid tools"
        href: "/tools/paid"
        children:
          - name: "Ai tools"
            description: "Best paid AI tools."
            icon: "lucide:flag"
            href: "/tools/paid/ai"
  - name: "Testimonials"
    href: "/#testimonials"
  - name: "Blogs"
    href: "/blog"
  - name: "Contact"
    href: "/#contact"
  - name: "FAQ"
    href: "/#faq"

ShortLinks:
  - name: "Home"
    href: "/"
  - name: "Blogs"
    href: "/blog"
  - name: "Login"
    href: "/login"
  - name: "Sign Up"
    href: "/register"
  - name: "Support"
    href: "/"
  - name: "Sitemap"
    href: "/sitemap.xml"
  - name: "Cookie settings"
    href: "/"

socialMedias:
  - name: facebook
    url: https://www.facebook.com/leamsigc
    icon: "facebook"
  - name: twitter
    url: https://twitter.com/leamsigc
    icon: "twitter"
  - name: instagram
    url: https://www.instagram.com/leamsigc
    icon: "instagram"
footerLinks:
  - title: Contact
    links:
      - name: Github
        url: https://github.com/leamsigc/nuxt-better-auth-drizzle
        icon: "lucide:github"
      - name: Twitter
        url: https://twitter.com/leamsigc
        icon: "lucide:twitter"
      - name: instagram
        url: https://www.instagram.com/leamsigc
        icon: "lucide:instagram"
      - name: Youtube
        url: https://www.youtube.com/@leamsigc
        icon: "lucide:youtube"
  - title: Platform
    links:
      - name: iOS
        url: /
      - name: Android
        url: /
      - name: Web
        url: /
  - title: Help
    links:
      - name: Contact us
        url: /contact
      - name: FAQ
        url: /#faq
      - name: Feedback
        url: /#faq

actions:
  - name: ''
    href: https://github.com/leamsigc/nuxt-better-auth-drizzle
    icon: "lucide:github"
    label: "View on GitHub"
    target: _blank
  - name: 'Login'
    href: "/login"
    icon: ""
    label: "Login to your account"
  - name: 'Register'
    href: "/register"
    label: "Register an account"
    icon: ""

loggedActions:
  - name: 'Dashboard'
    href: "/app/"
    label: "Dashboard"
    icon: "lucide:layout-dashboard"
---
