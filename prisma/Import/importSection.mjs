// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from '@fast-csv/parse';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction pour importer les Sections depuis un CSV
async function importSectionsFromCSV() {
  const csvFilePath = './sections_with_topic.csv'; // Chemin vers le fichier CSV

  const sections = []; // Tableau pour stocker les données du CSV

  // Lire et parser le fichier CSV
  fs.createReadStream(csvFilePath)
    .pipe(parse({ headers: true })) // Lecture du CSV avec en-tête
    .on('data', (row) => {
      sections.push({
        sectionTitle: row.SectionTitle,       // Titre de la section
        topicTitle: row.topicTitle, // Titre du topic lié
      });
    })
    .on('end', async () => {
      console.log(`Import de ${sections.length} Sections depuis ${csvFilePath}`);

      try {
        // Pour chaque section, recherche du topic et création de la Section
        for (const { sectionTitle, topicTitle } of sections) {
          // Recherche du topic par son titre
          const topic = await prisma.topic.findUnique({
            where: { title: topicTitle },
          });

          // Si le topic existe, on crée la section
          if (topic) {
            await prisma.section.create({
              data: {
                title: sectionTitle,            // Titre de la section
                topicId: topic.id,  // Lien avec le topic
              },
            });
            console.log(`Ajouté : Section "${sectionTitle}" liée à topic "${topicTitle}"`);
          } else {
            console.warn(`topic "${topicTitle}" introuvable pour la section "${sectionTitle}"`);
          }
        }

        console.log('Import réussi.');
      } catch (error) {
        console.error('Erreur lors de l\'importation des Sections :', error);
      } finally {
        await prisma.$disconnect();
      }
    })
    .on('error', (error) => {
      console.error('Erreur lors de la lecture du fichier CSV :', error);
    });
}

// Exécution du programme
importSectionsFromCSV();
