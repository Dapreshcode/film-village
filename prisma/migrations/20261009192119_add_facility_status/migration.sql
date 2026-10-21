-- CreateEnum
CREATE TYPE "FacilityStatus" AS ENUM ('PLANNED', 'IN_DEVELOPMENT', 'COMING_SOON');

-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "status" "FacilityStatus" NOT NULL DEFAULT 'PLANNED';
