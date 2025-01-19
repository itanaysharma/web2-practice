# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Notes

1. Initialized an empty turborepo
2. Deleted the docs app
3. Added http-backend, ws-backend folders
4. Added package.json in both the places
5. Added tsconfig.json in both the places, and imported it from @repo/typescript-config/base.json
6. added @repo/typescript as dependency in both ws-backend and http-backend package.json and then ran pnpm install to bring the dependencies.
7. added build, dev and start script on package.json also added compiler options in tsconfig so we can maintain a structure.
8. Now done pnpm add express @types/express in http-backend folder and pnpm add ws @types/ws in ws-backend folder and added one basic express and websocket code
9. added basic sinin, singnup and some othe basic apis and added a middleware who decodes the jwt token
10. Added jwt verify/ decoder on the websocket layer.
11. removed config.ts as it was on two location and repeating, instead created a new folder backend-common and follow below commands
    - pnpm init
    - created tsconfig.json added things there
    - changed the name of package.json to @repo
    - added the devdependencies that are added in the tsconfig.json
    - ran pnpm install on root level
    - now created src folder and added index.ts added the env
    - adding env wants to install pnpm @types/node
    - added export of rthat index.ts with a name as /config
    - added these dependencis to http-backend and ws-backend package.json
12. Now did the same to create a new folder for zod
13. created a packages.db folder and followed the similar procedure
    - pnpm install prisma
    - npx prisma init (This will initialize empty prisma)
    - defined the schema.
    - Update the database url in db/.env
    - now migrate npx prisma migrate dev --name init_schema
    - npx prisma generate (This command will create a client and install client dependencies in node_modules/@prisma/client)
    - now create and export instance of prisma client and add export in package.json
    - change name of package.json in db folder
    - add dependency of this package name in http-backend
14. Now add db in signup,signin and room
15. created a differnet function for the jwt validation in ws-server
16. Bad approch for state management in ws using array of objects
    - const user =[{
    - userId:1,
    - rooms:["room1","room2"],
    - ws: socket
    - }]
17. Adding the User array to contain all the states (User that are forming connection)
18. added supported operations join-room, leave-room and chat
19. adding db in ws
20. Added a chats room Id check point in http-backend so that all the chats in the room can be seen
