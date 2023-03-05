-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,
    "instagram_count" INTEGER,
    "instagram_url" TEXT,
    "facebook_count" INTEGER,
    "facebook_url" TEXT,
    "twitter_count" INTEGER,
    "twitter_url" TEXT,
    "youtube_count" INTEGER,
    "youtube_url" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");
