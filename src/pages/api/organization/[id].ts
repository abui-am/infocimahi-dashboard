import { TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { type NextApiRequest, type NextApiResponse } from 'next';

import runMiddleware from '@/utils/cors';

import { appRouter } from '../../../server/api/root';
import { createTRPCContext } from '../../../server/api/trpc';

const organizationByIdHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await runMiddleware(req, res);
  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  try {
    const { id } = req.query;
    if (!id || Array.isArray(id)) {
      res.status(404).json({
        message: 'Not Found',
      });
      return;
    }
    const user = await caller.organization.getOne({
      id,
    });
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause);
      res.status(httpCode).json(cause);
      return;
    }
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default organizationByIdHandler;
