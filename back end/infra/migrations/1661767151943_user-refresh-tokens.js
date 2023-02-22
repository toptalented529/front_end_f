exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS "publish_project" (
    "id" UUID PRIMARY KEY,
    "project_url" TEXT NOT NULL,
    "project_name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP);
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS "publish_project";
    `);
};
