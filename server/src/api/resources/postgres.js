import { Pool } from 'pg';

export default function(app) {
    const pool = new Pool({
        user: app.get('PGUSER'),
        host: app.get('PGHOST'),
        database: app.get('PGDATABASE'),
        password: app.get('PGPASSWORD')
    });

    return {
        getItems() {
            return pool.query('SELECT * FROM items').then(res => res.rows);
        },
        getItem(id) {
            return pool
                .query(`SELECT * FROM items WHERE id=${id}`)
                .then(res => res.rows[0]);
        }
    };
}