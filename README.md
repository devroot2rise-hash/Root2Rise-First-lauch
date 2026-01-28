This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Root2Rise-First-lauch

## EmailJS setup (welcome email)

1. Install the SDK (if not already):

```bash
npm install @emailjs/browser
```

2. Create a template in EmailJS and paste your HTML (the welcome email) into the template editor. Use these template variables where needed:

- `{{USER_NAME}}` or `{{user_name}}` — recipient name
- `{{USER_EMAIL}}` or `{{user_email}}` — recipient email
- `{{COLAB_URL}}` — Co-Lab community link
- `{{COMMUNITY_URL}}` — Community/social link

3. Add these environment variables to your local `.env.local` (do NOT commit):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. The code uses `sendWelcomeEmail(email, name, colabUrl, communityUrl)` from `lib/email.ts`.
	The function sends the following template variables (both uppercase and lowercase keys are included):

```
{
  user_email, user_name,
  USER_EMAIL, USER_NAME,
  COLAB_URL, COMMUNITY_URL
}
```

	The email is sent after successful signup and is non-blocking (errors are logged).

5. To test: run the dev server, sign up a new user, then verify delivery in your EmailJS dashboard (and check spam).

6. Add these environment variables for link placeholders (optional):

```
NEXT_PUBLIC_COLAB_URL=https://chat.whatsapp.com/your_invite_here
NEXT_PUBLIC_COMMUNITY_URL=https://your.community.link/here
```

These will be injected into the template as `{{COLAB_URL}}` and `{{COMMUNITY_URL}}`.

