import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';

export const organizationRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.organization.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  patchOrganizationSocMedCount: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          instagram_count: z.number().nullable(),
          facebook_count: z.number().nullable(),
          twitter_count: z.number().nullable(),
          youtube_count: z.number().nullable(),
        }),
      })
    )
    .mutation(
      ({
        input: {
          data: {
            instagram_count,
            facebook_count,
            twitter_count,
            youtube_count,
          },
          id,
        },
        ctx,
      }) => {
        if (
          !ctx.session.user?.roles.find((val) => val.idName === 'superadmin')
        ) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'An unexpected error occurred, please try again later.',
            // optional: pass the original error to retain stack trace
            cause: 'FORBIDDEN',
          });
        }
        return ctx.prisma.organization.update({
          data: {
            instagram_count,
            facebook_count,
            twitter_count,
            youtube_count,
          },
          where: {
            id,
          },
        });
      }
    ),
});
