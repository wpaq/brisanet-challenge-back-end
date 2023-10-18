-- CreateTable
CREATE TABLE "cadeiras_alunos" (
    "id" TEXT NOT NULL,
    "cadeiraId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "cadeiras_alunos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cadeiras_alunos" ADD CONSTRAINT "cadeiras_alunos_cadeiraId_fkey" FOREIGN KEY ("cadeiraId") REFERENCES "cadeiras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cadeiras_alunos" ADD CONSTRAINT "cadeiras_alunos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
