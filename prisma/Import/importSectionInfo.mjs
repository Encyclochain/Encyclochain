// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from '@fast-csv/parse';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction pour importer les SectionInfo depuis un CSV
async function importSectionInfoFromCSV() {
  const csvFilePath = './sectionInfo.csv'; // Chemin vers le fichier CSV

  const sectionInfos = []; // Tableau pour stocker les données du CSV

  // Lire et parser le fichier CSV
  fs.createReadStream(csvFilePath)
    .pipe(parse({ headers: true })) // Lecture du CSV avec en-tête
    .on('data', (row) => {
      // Ajoute chaque ligne au tableau sectionInfos
      sectionInfos.push({
        sectionTitle: row.SectionTitle,
        color: row.Color,
        imageLink: row.ImageLink,
        whitepaperLink: row.WhitepaperLink,
        twitterLink: row.TwitterLink,
        websiteLink: row.WebsiteLink,
      });
    })
    .on('end', async () => {
      console.log(`Import de ${sectionInfos.length} SectionInfos depuis ${csvFilePath}`);

      try {
        // Pour chaque SectionInfo, on recherche la section correspondante et on crée le SectionInfo
        for (const { sectionTitle, color, imageLink, whitepaperLink, twitterLink, websiteLink } of sectionInfos) {
          // Recherche de la section par son titre
          const section = await prisma.section.findUnique({
            where: { title: sectionTitle },
          });

          // Si la section existe, on crée le SectionInfo lié
          if (section) {
            await prisma.sectionInfo.create({
              data: {
                sectionId: section.id, // Lien avec la section
                color,
                imageLink,
                whitepaperLink,
                twitterLink,
                websiteLink,
              },
            });
            console.log(`Ajouté : SectionInfo pour la section "${sectionTitle}"`);
          } else {
            console.warn(`Section "${sectionTitle}" introuvable, SectionInfo non créé.`);
          }
        }

        console.log('Import réussi.');
      } catch (error) {
        console.error('Erreur lors de l\'importation des SectionInfos :', error);
      } finally {
        await prisma.$disconnect();
      }
    })
    .on('error', (error) => {
      console.error('Erreur lors de la lecture du fichier CSV :', error);
    });
}

// Exécution du programme
importSectionInfoFromCSV();
