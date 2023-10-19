-- DropForeignKey
ALTER TABLE "cadeiras" DROP CONSTRAINT "cadeiras_professorId_fkey";

-- DropForeignKey
ALTER TABLE "cadeiras_alunos" DROP CONSTRAINT "cadeiras_alunos_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "cadeiras_alunos" DROP CONSTRAINT "cadeiras_alunos_cadeiraId_fkey";

-- AddForeignKey
ALTER TABLE "cadeiras" ADD CONSTRAINT "cadeiras_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cadeiras_alunos" ADD CONSTRAINT "cadeiras_alunos_cadeiraId_fkey" FOREIGN KEY ("cadeiraId") REFERENCES "cadeiras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cadeiras_alunos" ADD CONSTRAINT "cadeiras_alunos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
