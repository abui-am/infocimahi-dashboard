import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { cleanObject } from '@/utils/object';

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user?.id,
      },
      include: {
        roles: true,
      },
    });
  }),
  getUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        roles: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }),
  getUser: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
      include: {
        roles: true,
      },
    });
  }),
  pathRoles: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          roles: z.array(z.string()),
        }),
      })
    )
    .mutation(
      async ({
        input: {
          id,
          data: { roles },
        },
        ctx,
      }) => {
        const user = await ctx.prisma.user.findFirst({
          where: {
            id,
          },
        });
        return ctx.prisma.user.update({
          where: {
            id,
          },

          data: cleanObject({
            onboardingStatus:
              user?.onboardingStatus === 'waitingRole' ? 'onboarded' : '',
            roles: {
              set: roles?.map((role) => ({
                idName: role,
              })),
            },
          }),
        });
      }
    ),
  pathUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          name: z.string(),
          onboardingStatus: z.string().nullable().optional(),
        }),
      })
    )
    .mutation(
      async ({
        input: {
          id,
          data: { name, onboardingStatus },
        },
        ctx,
      }) => {
        const newData = cleanObject({
          name,
          onboardingStatus,
        });
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
              ...newData,
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
          data: newData,
          where: {
            id,
          },
        });
      }
    ),
});
