// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { format } from '@fast-csv/format';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction principale pour exporter les informations de SectionInfo dans un CSV
async function exportSectionInfoToCSV() {
  try {
    // Récupération des informations de SectionInfo avec le titre et l'ID de la section liée
    const sectionInfos = await prisma.sectionInfo.findMany({
      select: {
        color: true,          // Sélection du champ color
        imageLink: true,      // Sélection du champ imageLink
        whitepaperLink: true, // Sélection du champ whitepaperLink
        twitterLink: true,    // Sélection du champ twitterLink
        websiteLink: true,    // Sélection du champ websiteLink
        section: {
          select: {
            id: true,         // Sélection de l'ID de la section liée
            title: true,      // Sélection du titre de la section liée
          },
        },
      },
    });

    // Chemin du fichier CSV
    const csvFilePath = './sectionInfo.csv';

    // Création d'un flux d'écriture vers le fichier CSV
    const csvStream = format({
      headers: ['SectionID', 'SectionTitle', 'Color', 'ImageLink', 'WhitepaperLink', 'TwitterLink', 'WebsiteLink'],
    });
    const writableStream = fs.createWriteStream(csvFilePath);

    // Connexion du flux au fichier
    csvStream.pipe(writableStream).on('end', () => process.exit());

    // Ajout des informations de chaque sectionInfo au fichier CSV
    sectionInfos.forEach((sectionInfo) => {
      csvStream.write([
        sectionInfo.section.id,        // ID de la section
        sectionInfo.section.title,     // Titre de la section
        sectionInfo.color,             // Couleur de la sectionInfo
        sectionInfo.imageLink,         // Lien de l'image
        sectionInfo.whitepaperLink,    // Lien du whitepaper
        sectionInfo.twitterLink,       // Lien du Twitter
        sectionInfo.websiteLink,       // Lien du site web
      ]);
    });

    // Fin du flux
    csvStream.end();

    console.log(`Export réussi. Fichier CSV créé : ${csvFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'exportation de SectionInfo :', error);
  } finally {
    // Fermeture du client Prisma
    await prisma.$disconnect();
  }
}

// Exécution du programme
exportSectionInfoToCSV();
