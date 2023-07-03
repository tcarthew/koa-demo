import Router from 'koa-router';

const prefix = '/users';
const router = new Router({ prefix, methods: ['GET', 'POST'] });
const users = [
  {
    id: 1,
    name: 'User One',
    auditDate: new Date().toISOString()
  },
  {
    id: 2,
    name: 'User Two',
    auditDate: new Date().toISOString()
  }
];

router.get('/:id', async (ctx, next) => {
  const id = ctx.params['id'];
  const user = users.find(u => u.id === +id);

  if (user) {
    ctx.body = { user };
    return await next();
  }

  ctx.response.status = 404;
  ctx.body = { message: `No user found for id ${id}` };
});

router.get('/', async (ctx) => {
  ctx.body = { users };
});

router.post('/', async (ctx) => {
  const id = users[users.length -1].id +1;
  const user = {
    id,
    ...ctx.request.body
  };
  
  users.push(user);
  ctx.set({ 'location': `${prefix}/${id}` });
  ctx.response.status = 201;
})

export default router.routes();