// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { format } from '@fast-csv/format';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction principale pour exporter les topic dans un CSV
async function exporttopicToCSV() {
  try {
    // Récupération des noms des topic depuis la base de données
    const topics = await prisma.topic.findMany({
      select: {
        title: true, // On ne sélectionne que les titres des topic
      },
    });

    // Chemin du fichier CSV
    const csvFilePath = './topics.csv';

    // Création d'un flux d'écriture vers le fichier CSV
    const csvStream = format({ headers: ['topic'] }); // Ajout d'en-tête "topic"
    const writableStream = fs.createWriteStream(csvFilePath);

    // Connexion du flux au fichier
    csvStream.pipe(writableStream).on('end', () => process.exit());

    // Ajout de chaque titre de topic au fichier CSV
    topics.forEach((topic) => {
      csvStream.write([topic.title]);
    });

    // Fin du flux
    csvStream.end();

    console.log(`Export réussi. Fichier CSV créé : ${csvFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'exportation des topic :', error);
  } finally {
    // Fermeture du client Prisma
    await prisma.$disconnect();
  }
}

// Exécution du programme
exporttopicToCSV();
