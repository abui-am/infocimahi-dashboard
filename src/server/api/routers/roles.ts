import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const rolesRouter = createTRPCRouter({
  getRoles: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.role.findMany();
  }),
});
