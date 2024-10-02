import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'fast-csv';

const prisma = new PrismaClient();

// Fonction pour normaliser les strings (supprimer les espaces en trop et convertir en minuscules)
function normalizeString(str) {
  return str.trim().toLowerCase();
}

// Fonction pour importer les données du CSV dans la table SectionInfo
async function importSectionInfoFromCSV(filePath) {
  const stream = fs.createReadStream(filePath);
  const csvStream = csv.parse({ headers: true });

  stream.pipe(csvStream)
    .on('data', async (row) => {
      const { Blockchain, Color, imageLink, whitepaperLink, twitterLink, websiteLink } = row;

      try {
        await prisma.$transaction(async (prisma) => {
          // Normaliser le nom de la blockchain (titre de la section)
          const normalizedBlockchain = normalizeString(Blockchain);

          // Chercher la section existante
          const section = await prisma.section.findFirst({
            where: {
              title: {
                equals: normalizedBlockchain,
                mode: 'insensitive', // Ignore la casse
              },
            },
          });

          // Si la section existe, mettre à jour ou créer une sectionInfo
          if (section) {
            // Vérifier si la sectionInfo existe déjà pour cette section
            let sectionInfo = await prisma.sectionInfo.findUnique({
              where: { sectionId: section.id },
            });

            if (sectionInfo) {
              // Mettre à jour la sectionInfo existante
              await prisma.sectionInfo.update({
                where: { sectionId: section.id },
                data: {
                  color: Color,
                  imageLink: imageLink,
                  whitepaperLink: whitepaperLink || null,
                  twitterLink: twitterLink || null,
                  websiteLink: websiteLink || null,
                },
              });
              console.log(`Updated SectionInfo for blockchain: ${Blockchain}`);
            } else {
              // Créer une nouvelle entrée dans sectionInfo si elle n'existe pas
              await prisma.sectionInfo.create({
                data: {
                  sectionId: section.id,
                  color: Color,
                  imageLink: imageLink,
                  whitepaperLink: whitepaperLink || null,
                  twitterLink: twitterLink || null,
                  websiteLink: websiteLink || null,
                },
              });
              console.log(`Created new SectionInfo for blockchain: ${Blockchain}`);
            }
          } else {
            console.error(`Section not found for blockchain: ${Blockchain}`);
          }
        });
      } catch (error) {
        console.error(`Error processing row: ${Blockchain}, ${Color}, ${imageLink}`);
        console.error(error);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

// Appel de la fonction pour importer un fichier CSV
const filePath = 'sectionInfo.csv'; // Remplacez par le chemin de votre fichier CSV
importSectionInfoFromCSV(filePath)
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
