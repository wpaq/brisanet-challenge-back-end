/*
  Warnings:

  - You are about to drop the column `carga_horaria` on the `cadeiras` table. All the data in the column will be lost.
  - You are about to drop the column `data_fim` on the `cadeiras` table. All the data in the column will be lost.
  - You are about to drop the column `data_inicio` on the `cadeiras` table. All the data in the column will be lost.
  - You are about to drop the column `professor_id` on the `cadeiras` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[professorId]` on the table `cadeiras` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cargaHoraria` to the `cadeiras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataFim` to the `cadeiras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `cadeiras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `cadeiras` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cadeiras" DROP CONSTRAINT "cadeiras_professor_id_fkey";

-- AlterTable
ALTER TABLE "cadeiras" DROP COLUMN "carga_horaria",
DROP COLUMN "data_fim",
DROP COLUMN "data_inicio",
DROP COLUMN "professor_id",
ADD COLUMN     "cargaHoraria" INTEGER NOT NULL,
ADD COLUMN     "dataFim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "professorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cadeiras_professorId_key" ON "cadeiras"("professorId");

-- AddForeignKey
ALTER TABLE "cadeiras" ADD CONSTRAINT "cadeiras_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
