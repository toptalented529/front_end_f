exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID PRIMARY KEY,
    "image_url" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,  
    "password" TEXT,  
    "verificationcode" TEXT,  
    "space" TEXT,  
    "business" TEXT,  
    "email_bus" TEXT,  
    "phone" TEXT,  
    "address" TEXT,  
    "language" TEXT,  
    "timezone" TEXT,  
    "payment" TEXT,  
    "is_verified" BOOLEAN,  
    "onboarding_finished" BOOLEAN,  
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
     UNIQUE("email"));
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS "user";
    `); 
};
