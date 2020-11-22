export default (express, bodyParser, fs, cookieParser) => {
    const users = new Set();
    const app = express();
    const protect = (r, res, next) => {
        const { user } = r.cookies;
        if (users.has(user)) return next();
        res.redirect('/denied');
    };
    app
    .use(cookieParser())
    .get('/login/', (req, res) => res.send('eliasgoss'))
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/denied', r => r.res.status(403).send('Доступ запрещён'))
    .get('/profile', protect, r => {
        const { user } = r.cookies;
        r.res.send(`Вы нашлись, ${user}!`);
    })
    .get('/prune', r => {
        const cookieHead = {'Set-Cookie': `user=.;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`};
        r.res.set(cookieHead).send(`Очищено!`);  
    })
    .get('/set/:user', r => {
        const { user } = r.params;
        const cookieHead = {'Set-Cookie': `user=${user};path=/;max-age=60`}; 
        users.add(user);
        r.res.set(cookieHead).send(`Установлено: ${user}!`); 
    })
    .get('/*', r => r.res.send('21 ноября 2020 г.'));


   
    return app;

}
