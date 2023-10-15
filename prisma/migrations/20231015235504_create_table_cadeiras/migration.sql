-- CreateTable
CREATE TABLE "cadeiras" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "carga_horaria" INTEGER NOT NULL,
    "professor_id" TEXT NOT NULL,

    CONSTRAINT "cadeiras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cadeiras" ADD CONSTRAINT "cadeiras_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
