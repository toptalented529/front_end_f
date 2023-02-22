exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS "project" (
    "id" UUID PRIMARY KEY,
    "image_id" TEXT[],
    "urls" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,  
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
     UNIQUE("urls")
);
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS "user";
    `);
};
