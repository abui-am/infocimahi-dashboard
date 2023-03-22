import { exampleRouter } from '@/server/api/routers/example';
import { createTRPCRouter } from '@/server/api/trpc';

import { organizationRouter } from './routers/organization';
import { rolesRouter } from './routers/roles';
import { userRouter } from './routers/user';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  organization: organizationRouter,
  user: userRouter,
  roles: rolesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
