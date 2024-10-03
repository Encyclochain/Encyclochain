// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { format } from '@fast-csv/format';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction principale pour exporter les Sections et leurs topics dans un CSV
async function exportSectionsToCSV() {
  try {
    // Récupération des sections avec leur topic associé
    const sections = await prisma.section.findMany({
      select: {
        title: true,         // Titre de la section
        topic: {       // Type de la section
          select: {
            title: true,     // Titre du topic
          },
        },
      },
    });

    // Chemin du fichier CSV
    const csvFilePath = './sections_with_topic.csv';

    // Création d'un flux d'écriture vers le fichier CSV
    const csvStream = format({
      headers: ['SectionTitle', 'topicTitle'], // En-têtes du fichier CSV
    });
    const writableStream = fs.createWriteStream(csvFilePath);

    // Connexion du flux au fichier
    csvStream.pipe(writableStream).on('end', () => process.exit());

    // Ajout des informations de chaque section et son type au fichier CSV
    sections.forEach((section) => {
      csvStream.write([
        section.title,                // Titre de la section
        section.topic.title,    // Titre du topic lié
      ]);
    });

    // Fin du flux
    csvStream.end();

    console.log(`Export réussi. Fichier CSV créé : ${csvFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'exportation des Sections :', error);
  } finally {
    // Fermeture du client Prisma
    await prisma.$disconnect();
  }
}

// Exécution du programme
exportSectionsToCSV();
