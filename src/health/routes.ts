import Router from 'koa-router';

const router = new Router({ prefix: '/health', methods: ['GET'] });

router.get('/', async (ctx) => {
  ctx.body = { ping: 'pong' };
});

export default router.routes();