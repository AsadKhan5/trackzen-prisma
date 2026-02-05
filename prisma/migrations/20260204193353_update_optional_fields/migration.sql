-- CreateEnum
CREATE TYPE "Role" AS ENUM ('superAdmin', 'Operations', 'siteEngineer', 'sales', 'accounts');

-- CreateEnum
CREATE TYPE "Exprience" AS ENUM ('fresher', 'junior', 'intermediate', 'senior', 'expert');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "empId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "address" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "experience" "Exprience" NOT NULL DEFAULT 'fresher',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_empId_key" ON "users"("empId");

-- CreateIndex
CREATE INDEX "users_email_empId_role_idx" ON "users"("email", "empId", "role");
