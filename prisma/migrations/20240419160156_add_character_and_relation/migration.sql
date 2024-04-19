-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToComic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToComic_AB_unique" ON "_CharacterToComic"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToComic_B_index" ON "_CharacterToComic"("B");

-- AddForeignKey
ALTER TABLE "_CharacterToComic" ADD CONSTRAINT "_CharacterToComic_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToComic" ADD CONSTRAINT "_CharacterToComic_B_fkey" FOREIGN KEY ("B") REFERENCES "Comic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
