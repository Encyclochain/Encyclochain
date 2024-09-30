// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { format } from '@fast-csv/format';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction principale pour exporter les catégories et leurs sections dans un CSV
async function exportCategoriesToCSV() {
  try {
    // Récupération des catégories avec les sections liées
    const categories = await prisma.category.findMany({
      select: {
        title: true,  // Titre de la catégorie
        sections: {   // Sections liées à cette catégorie
          select: {
            id: true,   // ID de la section
            title: true // Titre de la section
          }
        }
      }
    });

    // Chemin du fichier CSV
    const csvFilePath = './categories.csv';

    // Création d'un flux d'écriture vers le fichier CSV
    const csvStream = format({
      headers: ['CategoryTitle', 'SectionID', 'SectionTitle'],
    });
    const writableStream = fs.createWriteStream(csvFilePath);

    // Connexion du flux au fichier
    csvStream.pipe(writableStream).on('end', () => process.exit());

    // Ajout des informations de chaque catégorie et ses sections liées au fichier CSV
    categories.forEach((category) => {
      // Pour chaque catégorie, on ajoute une ligne pour chaque section liée
      category.sections.forEach((section) => {
        csvStream.write([
          category.title,   // Titre de la catégorie
          section.id,       // ID de la section liée
          section.title,    // Titre de la section liée
        ]);
      });
    });

    // Fin du flux
    csvStream.end();

    console.log(`Export réussi. Fichier CSV créé : ${csvFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'exportation des catégories :', error);
  } finally {
    // Fermeture du client Prisma
    await prisma.$disconnect();
  }
}

// Exécution du programme
exportCategoriesToCSV();
