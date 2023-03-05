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
