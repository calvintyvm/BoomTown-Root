export default function(app) {
  app.set("DEV_WEB_SERVER", "http://localhost:3000");

  app.set("PGUSER", process.env.PGUSER || "boomtown");
  app.set("PGPASSWORD", process.env.PGPASSWORD || "boomtown");
  app.set("PGDATABASE", process.env.PGDATABASE || "boomtown");
  app.set("PGHOST", process.env.PGHOST || "localhost");

  app.set(
    "FIREBASE_API_KEY",
    process.env.FIREBASE_API_KEY || "AIzaSyAmRK7Dryl0fMWBEA3-q0odFK8A6Ct7Sk"
  );
  app.set(
    "FIREBASE_AUTH_DOMAIN",
    process.env.FIREBASE_AUTH_DOMAIN || "boomtown-c8fa1.firebaseapp.com"
  );
  app.set(
    "FIREBASE_DB_URL",
    process.env.FIREBASE_DB_URL || "https://boomtown-c8fa1.firebaseio.com"
  );
  app.set(
    "FIREBASE_PROJECT_ID" || process.env.FIREBASE_PROJECT_ID || "boomtown-c8fa1"
  );
  app.set(
    "FIREBASE_STORAGE_BUCKET" ||
      process.env.FIREBASE_STORAGE_BUCKEY ||
      "boomtown-c8fa1.appspot.com"
  );
  app.set(
    "FIREBASE_MSG_SENDER_ID" ||
      process.env.FIREBASE_MSG_SENDER_ID ||
      "801644784464"
  );
}
