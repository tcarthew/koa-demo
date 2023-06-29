import Koa, { Next } from 'koa';
import bodyParser from '@koa/bodyparser';
import healthRoutes from './health/routes';
import usersRoutes from './users/routes';

const app = new Koa();
const PORT = 3000;

app.use(async (ctx, next: Next) => {
  console.time(`### Request begin [${ctx.url}]`);
  // pass the request onto the next middleware function
  await next();
  console.timeEnd(`### Request begin [${ctx.url}]`);
});
app.use(bodyParser());

app.use(healthRoutes);
app.use(usersRoutes);

app.listen(PORT);

console.log(`Koa server listening on ${PORT}`);

