// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from '@fast-csv/parse';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction pour importer les Catégories depuis un CSV
async function importCategoriesFromCSV() {
  const csvFilePath = './categories.csv'; // Chemin vers le fichier CSV

  const categories = []; // Tableau pour stocker les données du CSV

  // Lire et parser le fichier CSV
  fs.createReadStream(csvFilePath)
    .pipe(parse({ headers: true })) // Lecture du CSV avec en-tête
    .on('data', (row) => {
      categories.push(row.CategoryTitle); // Ajout du titre de catégorie
    })
    .on('end', async () => {
      console.log(`Import de ${categories.length} catégories depuis ${csvFilePath}`);

      try {
        // Pour chaque catégorie, création dans la base de données
        for (const categoryTitle of categories) {
          await prisma.category.create({
            data: {
              title: categoryTitle, // Ajout du titre de la catégorie
            },
          });
          console.log(`Ajouté : Catégorie "${categoryTitle}"`);
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
