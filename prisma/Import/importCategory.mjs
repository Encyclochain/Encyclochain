// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from '@fast-csv/parse';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction pour importer les Catégories depuis un CSV et les lier aux sections
async function importCategoriesFromCSV() {
  const csvFilePath = '../categories.csv'; // Chemin vers le fichier CSV

  const categories = []; // Tableau pour stocker les données du CSV

  // Lire et parser le fichier CSV
  fs.createReadStream(csvFilePath)
    .pipe(parse({ headers: true })) // Lecture du CSV avec en-tête
    .on('data', (row) => {
      categories.push({
        title: row.CategoryTitle,    // Titre de la catégorie
        sectionId: parseInt(row.SectionID),  // ID de la section
        sectionTitle: row.SectionTitle  // Titre de la section (si nécessaire)
      });
    })
    .on('end', async () => {
      console.log(`Import de ${categories.length} catégories depuis ${csvFilePath}`);

      try {
        // Pour chaque catégorie, vérifie si elle existe déjà et assigne les sections correspondantes
        for (const { title, sectionId } of categories) {
          // Vérifie si la catégorie existe déjà avec findFirst
          let category = await prisma.category.findFirst({
            where: { title },
          });

          // Si la catégorie n'existe pas, la créer
          if (!category) {
            category = await prisma.category.create({
              data: {
                title,
              },
            });
            console.log(`Ajouté : Catégorie "${title}"`);
          } else {
            console.log(`Catégorie "${title}" existe déjà.`);
          }

          // Lier la catégorie à la section correspondante
          const section = await prisma.section.findUnique({
            where: { id: sectionId },
          });

          if (section) {
            await prisma.category.update({
              where: { id: category.id },
              data: {
                sections: {
                  connect: { id: section.id },  // Lier la section à la catégorie
                },
              },
            });
            console.log(`Lié : Section "${sectionId}" à la catégorie "${title}"`);
          } else {
            console.warn(`Section avec ID "${sectionId}" introuvable pour la catégorie "${title}".`);
          }
        }

        console.log('Import réussi.');
      } catch (error) {
        console.error('Erreur lors de l\'importation des catégories :', error);
      } finally {
        await prisma.$disconnect();
      }
    })
    .on('error', (error) => {
      console.error('Erreur lors de la lecture du fichier CSV :', error);
    });
}

// Exécution du programme
importCategoriesFromCSV();
