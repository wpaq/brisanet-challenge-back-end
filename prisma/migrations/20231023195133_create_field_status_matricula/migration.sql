/*
  Warnings:

  - Added the required column `professorId` to the `cadeiras_alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusMatricula` to the `cadeiras_alunos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MatriculaStatus" AS ENUM ('Pendente', 'Aprovado', 'Rejeitado');

-- AlterTable
ALTER TABLE "cadeiras_alunos" ADD COLUMN     "professorId" TEXT NOT NULL,
ADD COLUMN     "statusMatricula" "MatriculaStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "cadeiras_alunos" ADD CONSTRAINT "cadeiras_alunos_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
