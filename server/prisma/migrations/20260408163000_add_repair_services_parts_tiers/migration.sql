CREATE TABLE "tiers" (
  "tier_id" INTEGER NOT NULL,
  "tier" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "tiers_pkey" PRIMARY KEY ("tier_id")
);

CREATE TABLE "part_quality" (
  "part_id" INTEGER NOT NULL,
  "part_type" TEXT NOT NULL,
  "tier_id" INTEGER,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "part_quality_pkey" PRIMARY KEY ("part_id")
);

CREATE TABLE "repair_services" (
  "service_id" INTEGER NOT NULL,
  "servis_name" TEXT NOT NULL,
  "part_id" INTEGER,
  "tier_id" INTEGER,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "repair_services_pkey" PRIMARY KEY ("service_id")
);

CREATE INDEX "part_quality_tier_id_idx" ON "part_quality"("tier_id");
CREATE INDEX "repair_services_part_id_idx" ON "repair_services"("part_id");
CREATE INDEX "repair_services_tier_id_idx" ON "repair_services"("tier_id");

ALTER TABLE "part_quality"
  ADD CONSTRAINT "part_quality_tier_id_fkey"
  FOREIGN KEY ("tier_id") REFERENCES "tiers"("tier_id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "repair_services"
  ADD CONSTRAINT "repair_services_part_id_fkey"
  FOREIGN KEY ("part_id") REFERENCES "part_quality"("part_id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "repair_services"
  ADD CONSTRAINT "repair_services_tier_id_fkey"
  FOREIGN KEY ("tier_id") REFERENCES "tiers"("tier_id")
  ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "tiers" ("tier_id", "tier", "updated_by")
VALUES
  (1, 'Diamond', 'seed:services-parts-tiers'),
  (2, 'Platinum', 'seed:services-parts-tiers'),
  (3, 'Gold', 'seed:services-parts-tiers'),
  (4, 'Silver', 'seed:services-parts-tiers')
ON CONFLICT ("tier_id") DO NOTHING;

INSERT INTO "part_quality" ("part_id", "part_type", "updated_by")
VALUES
  (1, 'New Genuine Apple ekran', 'seed:services-parts-tiers'),
  (2, 'Used / Refurbished Genuine ekran', 'seed:services-parts-tiers'),
  (3, 'Soft Oled ekran', 'seed:services-parts-tiers'),
  (4, 'Hard Oled ekran', 'seed:services-parts-tiers'),
  (5, 'LCD ekran', 'seed:services-parts-tiers'),
  (6, 'New Genuine Apple baterija', 'seed:services-parts-tiers'),
  (7, 'OEM + dijagnostika', 'seed:services-parts-tiers'),
  (8, 'Aftermarket', 'seed:services-parts-tiers')
ON CONFLICT ("part_id") DO NOTHING;

INSERT INTO "repair_services" ("service_id", "servis_name", "updated_by")
VALUES
  (1, 'Zaslon menjava', 'seed:services-parts-tiers'),
  (2, 'Baterija menjava', 'seed:services-parts-tiers'),
  (3, 'Zadnje steklo menjava', 'seed:services-parts-tiers'),
  (4, 'Ohisje menjava', 'seed:services-parts-tiers'),
  (5, 'Zvocniki menjava', 'seed:services-parts-tiers'),
  (6, 'Kamera menjava', 'seed:services-parts-tiers'),
  (7, 'Gumbi menjava', 'seed:services-parts-tiers'),
  (8, 'Prenos podatkov', 'seed:services-parts-tiers')
ON CONFLICT ("service_id") DO NOTHING;


