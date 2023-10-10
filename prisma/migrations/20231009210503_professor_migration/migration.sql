-- CreateTable
CREATE TABLE "professores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" BIGINT NOT NULL,

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professores_email_key" ON "professores"("email");
