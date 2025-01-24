-- CreateTable
CREATE TABLE "public"."user_profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."kanban_board" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "kanban_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."job_category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "job_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."job_application" (
    "id" UUID NOT NULL,
    "category_id" UUID,
    "job_title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_size" TEXT,
    "company_industry" TEXT,
    "location" TEXT,
    "work_model" TEXT,
    "skills" TEXT[],
    "job_url" TEXT NOT NULL,
    "kanban_board_id" UUID NOT NULL,

    CONSTRAINT "job_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shared_board_link" (
    "id" UUID NOT NULL,
    "link_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kanban_board_id" UUID NOT NULL,

    CONSTRAINT "shared_board_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_email_key" ON "public"."user_profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shared_board_link_link_token_key" ON "public"."shared_board_link"("link_token");

-- CreateIndex
CREATE UNIQUE INDEX "shared_board_link_kanban_board_id_key" ON "public"."shared_board_link"("kanban_board_id");

-- AddForeignKey
ALTER TABLE "public"."kanban_board" ADD CONSTRAINT "kanban_board_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."job_category" ADD CONSTRAINT "job_category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."job_application" ADD CONSTRAINT "job_application_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."job_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."job_application" ADD CONSTRAINT "job_application_kanban_board_id_fkey" FOREIGN KEY ("kanban_board_id") REFERENCES "public"."kanban_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shared_board_link" ADD CONSTRAINT "shared_board_link_kanban_board_id_fkey" FOREIGN KEY ("kanban_board_id") REFERENCES "public"."kanban_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
