// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client'; // Assurez-vous d'importer le client Prisma
import * as fs from 'node:fs'; // Import correct de fs pour les modules ESM
import { parse } from '@fast-csv/parse'; // Import de fast-csv pour le parsing CSV

// Initialisation de Prisma Client
const prisma = new PrismaClient(); // Définir le client Prisma

// Fonction pour importer les Sections depuis un CSV
async function importSectionsFromCSV() {
  const csvFilePath = '../sections_with_topic.csv'; // Chemin vers le fichier CSV

  const sections = []; // Tableau pour stocker les données du CSV

  // Lire et parser le fichier CSV
  fs.createReadStream(csvFilePath)
    .pipe(parse({ headers: true })) // Lecture du CSV avec en-tête
    .on('data', (row) => {
      sections.push({
        sectionTitle: row.SectionTitle,       // Titre de la section
        topicTitle: row.topicTitle,           // Titre du topic lié
      });
    })
    .on('end', async () => {
      console.log(`Import de ${sections.length} Sections depuis ${csvFilePath}`);

      try {
        // Pour chaque section, rechercher le topic et créer la Section
        for (const { sectionTitle, topicTitle } of sections) {
          // Rechercher le topic par son titre
          const topic = await prisma.topic.findFirst({
            where: { title: topicTitle }, // Utilisation de findFirst pour rechercher par title
          });

          if (!topic) {
            // Si le topic n'existe pas, ne pas créer de section
            console.warn(`Le topic "${topicTitle}" n'existe pas. La section "${sectionTitle}" n'a pas été créée.`);
            continue;
          }

          const existingSection = await prisma.section.findFirst({
            where: {
              title: sectionTitle,
              topicId: topic.id,
            },
          });

          if (existingSection) {
            console.warn(`La section "${sectionTitle}" existe déjà pour le topic "${topicTitle}".`);
            continue; // Passer à la section suivante si elle existe déjà
          }

          // Si la section n'existe pas, la créer
          await prisma.section.create({
            data: {
              title: sectionTitle,  // Titre de la section
              topicId: topic.id,    // Lien avec le topic existant
            },
          });
          console.log(`Ajouté : Section "${sectionTitle}" liée à topic "${topicTitle}"`);
        }

        console.log('Import terminé avec succès.');
      } catch (error) {
        console.error('Erreur lors de l\'importation des Sections :', error);
      } finally {
        await prisma.$disconnect(); // Toujours fermer la connexion Prisma après utilisation
      }
    })
    .on('error', (error) => {
      console.error('Erreur lors de la lecture du fichier CSV :', error);
    });
}

// Exécution du programme
importSectionsFromCSV();
