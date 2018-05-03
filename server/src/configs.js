
export default function(app) {
    app.set('DEV_WEB_SERVER', 'http://localhost:3000');

    app.set('PGUSER', process.env.PGUSER || 'boomtown');
    app.set('PGPASSWORD', process.env.PGPASSWORD || 'boomtown');
    app.set('PGDATABASE', process.env.PGDATABASE || 'boomtown');
    app.set('PGHOST', process.env.PGHOST || 'localhost');
}