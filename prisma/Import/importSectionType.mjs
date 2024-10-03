// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from '@fast-csv/parse';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction pour importer les topic depuis un CSV
async function importtopicsFromCSV() {
  const csvFilePath = '../topics.csv'; // Chemin vers le fichier CSV

  const topics = []; // Tableau pour stocker les données du CSV

  // Lire et parser le fichier CSV
  fs.createReadStream(csvFilePath)
    .pipe(parse({ headers: true })) // Lecture du CSV avec en-tête
    .on('data', (row) => {
      // Ajoute chaque topic à la liste
      topics.push(row.topic);
    })
    .on('end', async () => {
      console.log(`Import de ${topics.length} topics depuis ${csvFilePath}`);

      // Insertion dans la base de données
      try {
        for (const title of topics) {
          await prisma.topic.create({
            data: {
              title, // Ajout du titre à la base de données
            },
          });
          console.log(`Ajouté : ${title}`);
        }
        console.log('Import réussi.');
      } catch (error) {
        console.error('Erreur lors de l\'importation des topics :', error);
      } finally {
        await prisma.$disconnect();
      }
    })
    .on('error', (error) => {
      console.error('Erreur lors de la lecture du fichier CSV :', error);
    });
}

// Exécution du programme
importtopicsFromCSV();
