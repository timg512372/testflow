const { createServer } = require('http');
const next = require('next');

const app = next({
    dev: process.env.NODE_ENV === 'development'
});

console.log(process.env.NODE_ENV);

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(process.env.PORT || 3000, err => {
        if (err) throw err;
        console.log('Ready on http://localhost:3000 (with a custom server)');
    });
});
