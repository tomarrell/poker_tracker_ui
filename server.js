const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');

const app = new Koa();
const port = process.env.PORT || 3000;

// Serve static files if they exist
app.use(serve('.'));

// Otherwise return the index.html for SPA routing
app.use(async ctx => {
  await send(ctx, 'index.html');
});

app.listen(port);
console.log(`Listening on port: ${port}`);
