// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { format } from '@fast-csv/format';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction principale pour exporter les SectionType dans un CSV
async function exportSectionTypeToCSV() {
  try {
    // Récupération des noms des SectionType depuis la base de données
    const sectionTypes = await prisma.sectionType.findMany({
      select: {
        title: true, // On ne sélectionne que les titres des SectionType
      },
    });

    // Chemin du fichier CSV
    const csvFilePath = './sectionTypes.csv';

    // Création d'un flux d'écriture vers le fichier CSV
    const csvStream = format({ headers: ['SectionType'] }); // Ajout d'en-tête "SectionType"
    const writableStream = fs.createWriteStream(csvFilePath);

    // Connexion du flux au fichier
    csvStream.pipe(writableStream).on('end', () => process.exit());

    // Ajout de chaque titre de SectionType au fichier CSV
    sectionTypes.forEach((sectionType) => {
      csvStream.write([sectionType.title]);
    });

    // Fin du flux
    csvStream.end();

    console.log(`Export réussi. Fichier CSV créé : ${csvFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'exportation des SectionType :', error);
  } finally {
    // Fermeture du client Prisma
    await prisma.$disconnect();
  }
}

// Exécution du programme
exportSectionTypeToCSV();
