/*
  Warnings:

  - Changed the type of `statusMatricula` on the `cadeiras_alunos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cadeiras_alunos" DROP COLUMN "statusMatricula",
ADD COLUMN     "statusMatricula" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MatriculaStatus";
