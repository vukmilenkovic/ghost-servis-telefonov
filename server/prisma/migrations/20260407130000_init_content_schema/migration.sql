CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE "BookingFieldCode" AS ENUM ('device_type', 'brand', 'issue');
CREATE TYPE "ContactFieldCode" AS ENUM ('full_name', 'phone', 'model', 'issue');
CREATE TYPE "SectionCode" AS ENUM ('services', 'benefits', 'process', 'reviews', 'faq');
CREATE TYPE "PageCode" AS ENUM ('services', 'servis', 'pricing', 'contact');

CREATE TABLE "site_settings" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "working_hours" TEXT NOT NULL,
  "fast_contact" TEXT NOT NULL,
  "brand_title" TEXT NOT NULL,
  "brand_subtitle" TEXT NOT NULL,
  "cta_primary_header" TEXT NOT NULL,
  "cta_hero_primary" TEXT NOT NULL,
  "cta_hero_secondary" TEXT NOT NULL,
  "cta_mobile" TEXT NOT NULL,
  "common_label_time" TEXT NOT NULL,
  "common_label_price" TEXT NOT NULL,
  "footer_title" TEXT NOT NULL,
  "footer_tagline" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "site_settings_singleton_check" CHECK ("id" = 1)
);

CREATE TABLE "navigation_items" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "label" TEXT NOT NULL,
  "route" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "navigation_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "navigation_items_route_key" ON "navigation_items"("route");
CREATE UNIQUE INDEX "navigation_items_sort_order_key" ON "navigation_items"("sort_order");

CREATE TABLE "hero_content" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "kicker" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "title_accent" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "hero_content_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "hero_content_singleton_check" CHECK ("id" = 1)
);

CREATE TABLE "booking_form" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "submit_label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "booking_form_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "booking_form_singleton_check" CHECK ("id" = 1)
);

CREATE TABLE "booking_form_fields" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "booking_form_id" INTEGER NOT NULL DEFAULT 1,
  "code" "BookingFieldCode" NOT NULL,
  "label" TEXT NOT NULL,
  "placeholder" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "booking_form_fields_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "booking_form_fields_code_key" ON "booking_form_fields"("code");
CREATE UNIQUE INDEX "booking_form_fields_sort_order_key" ON "booking_form_fields"("sort_order");

CREATE TABLE "booking_form_field_options" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "field_id" UUID NOT NULL,
  "value" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "booking_form_field_options_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "booking_form_field_options_field_id_value_key" ON "booking_form_field_options"("field_id", "value");
CREATE UNIQUE INDEX "booking_form_field_options_field_id_sort_order_key" ON "booking_form_field_options"("field_id", "sort_order");

CREATE TABLE "section_headers" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "code" "SectionCode" NOT NULL,
  "kicker" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "section_headers_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "section_headers_code_key" ON "section_headers"("code");

CREATE TABLE "stats" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "value" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "stats_sort_order_key" ON "stats"("sort_order");

CREATE TABLE "services" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "copy" TEXT NOT NULL,
  "eta_text" TEXT NOT NULL,
  "price_text" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");
CREATE UNIQUE INDEX "services_sort_order_key" ON "services"("sort_order");

CREATE TABLE "benefits" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "copy" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "benefits_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "benefits_sort_order_key" ON "benefits"("sort_order");

CREATE TABLE "process_steps" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "process_steps_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "process_steps_sort_order_key" ON "process_steps"("sort_order");

CREATE TABLE "reviews" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "author_name" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "is_published" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "reviews_sort_order_key" ON "reviews"("sort_order");

CREATE TABLE "faqs" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "is_published" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "faqs_sort_order_key" ON "faqs"("sort_order");

CREATE TABLE "page_intros" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "page_code" "PageCode" NOT NULL,
  "kicker" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "page_intros_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "page_intros_page_code_key" ON "page_intros"("page_code");

CREATE TABLE "services_page_meta" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "gallery_title" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "services_page_meta_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "services_page_meta_singleton_check" CHECK ("id" = 1)
);

CREATE TABLE "service_brands" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "code" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "service_brands_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "service_brands_code_key" ON "service_brands"("code");
CREATE UNIQUE INDEX "service_brands_sort_order_key" ON "service_brands"("sort_order");

CREATE TABLE "pricing_rows" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "service_id" UUID,
  "service_label" TEXT NOT NULL,
  "estimate_text" TEXT NOT NULL,
  "eta_text" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "pricing_rows_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "pricing_rows_sort_order_key" ON "pricing_rows"("sort_order");

CREATE TABLE "pricing_notes" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "note" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "pricing_notes_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "pricing_notes_sort_order_key" ON "pricing_notes"("sort_order");

CREATE TABLE "contact_page_channels" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "detail" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "contact_page_channels_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "contact_page_channels_sort_order_key" ON "contact_page_channels"("sort_order");

CREATE TABLE "contact_section" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "title" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "call_label" TEXT NOT NULL,
  "call_href" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "contact_section_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "contact_section_singleton_check" CHECK ("id" = 1)
);

CREATE TABLE "contact_section_details" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "contact_section_id" INTEGER NOT NULL DEFAULT 1,
  "detail" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "contact_section_details_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "contact_section_details_sort_order_key" ON "contact_section_details"("sort_order");

CREATE TABLE "contact_form" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "submit_label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "contact_form_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "contact_form_singleton_check" CHECK ("id" = 1)
);

CREATE TABLE "contact_form_fields" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "contact_form_id" INTEGER NOT NULL DEFAULT 1,
  "code" "ContactFieldCode" NOT NULL,
  "label" TEXT NOT NULL,
  "placeholder" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" TEXT NOT NULL DEFAULT 'system',

  CONSTRAINT "contact_form_fields_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "contact_form_fields_code_key" ON "contact_form_fields"("code");
CREATE UNIQUE INDEX "contact_form_fields_sort_order_key" ON "contact_form_fields"("sort_order");

ALTER TABLE "booking_form_fields"
  ADD CONSTRAINT "booking_form_fields_booking_form_id_fkey"
  FOREIGN KEY ("booking_form_id") REFERENCES "booking_form"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "booking_form_field_options"
  ADD CONSTRAINT "booking_form_field_options_field_id_fkey"
  FOREIGN KEY ("field_id") REFERENCES "booking_form_fields"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "pricing_rows"
  ADD CONSTRAINT "pricing_rows_service_id_fkey"
  FOREIGN KEY ("service_id") REFERENCES "services"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "contact_section_details"
  ADD CONSTRAINT "contact_section_details_contact_section_id_fkey"
  FOREIGN KEY ("contact_section_id") REFERENCES "contact_section"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "contact_form_fields"
  ADD CONSTRAINT "contact_form_fields_contact_form_id_fkey"
  FOREIGN KEY ("contact_form_id") REFERENCES "contact_form"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
