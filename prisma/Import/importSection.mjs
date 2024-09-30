// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from '@fast-csv/parse';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction pour importer les Sections depuis un CSV
async function importSectionsFromCSV() {
  const csvFilePath = './sections_with_sectionType.csv'; // Chemin vers le fichier CSV

  const sections = []; // Tableau pour stocker les données du CSV

  // Lire et parser le fichier CSV
  fs.createReadStream(csvFilePath)
    .pipe(parse({ headers: true })) // Lecture du CSV avec en-tête
    .on('data', (row) => {
      sections.push({
        sectionTitle: row.SectionTitle,       // Titre de la section
        sectionTypeTitle: row.SectionTypeTitle, // Titre du SectionType lié
      });
    })
    .on('end', async () => {
      console.log(`Import de ${sections.length} Sections depuis ${csvFilePath}`);

      try {
        // Pour chaque section, recherche du SectionType et création de la Section
        for (const { sectionTitle, sectionTypeTitle } of sections) {
          // Recherche du SectionType par son titre
          const sectionType = await prisma.sectionType.findUnique({
            where: { title: sectionTypeTitle },
          });

          // Si le SectionType existe, on crée la section
          if (sectionType) {
            await prisma.section.create({
              data: {
                title: sectionTitle,            // Titre de la section
                sectionTypeId: sectionType.id,  // Lien avec le SectionType
              },
            });
            console.log(`Ajouté : Section "${sectionTitle}" liée à SectionType "${sectionTypeTitle}"`);
          } else {
            console.warn(`SectionType "${sectionTypeTitle}" introuvable pour la section "${sectionTitle}"`);
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
