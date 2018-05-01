export default function (app){

app.set('PGUSER', process.env.PGUSER);
app.set('PGPASSWORD', process.env.PGPASSWORD);
app.set('PGDATABASE', process.env.PGDATABASE);
app.set('PGHOST', process.env.PGHOST);

}