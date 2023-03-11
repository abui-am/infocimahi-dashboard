import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user?.id,
      },
    });
  }),
  pathUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          name: z.string(),
        }),
      })
    )
    .mutation(
      async ({
        input: {
          id,
          data: { name },
        },
        ctx,
      }) => {
        if (
          (
            await ctx.prisma.user.findMany({
              where: {
                roles: {
                  some: {
                    idName: 'superadmin',
                  },
                },
              },
            })
          ).length === 0
        ) {
          const superAdmin = await ctx.prisma.role.findFirst({
            where: {
              idName: 'superadmin',
            },
          });
          return ctx.prisma.user.update({
            data: {
              name,
              roles: {
                set: {
                  id: superAdmin?.id,
                },
              },
            },
            where: {
              id,
            },
          });
        }
        return ctx.prisma.user.update({
          data: {
            name,
          },
          where: {
            id,
          },
        });
      }
    ),
});
