// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { format } from '@fast-csv/format';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction principale pour exporter les ressources, catégories et sections dans un CSV
async function exportResourcesToCSV() {
  try {
    // Récupération des ressources avec les sections et catégories associées
    const resources = await prisma.resource.findMany({
      select: {
        link: true,      // Lien de la ressource
        sections: {      // Sections liées à cette ressource
          select: {
            title: true, // Titre de la section
          },
        },
        categories: {    // Catégories liées à cette ressource
          select: {
            title: true, // Titre de la catégorie
          },
        },
      },
    });

    // Chemin du fichier CSV
    const csvFilePath = './resources.csv';

    // Création d'un flux d'écriture vers le fichier CSV
    const csvStream = format({
      headers: ['Lien (resources)', 'Category', 'Section'],
    });
    const writableStream = fs.createWriteStream(csvFilePath);

    // Connexion du flux au fichier
    csvStream.pipe(writableStream).on('end', () => process.exit());

    // Ajout des informations de chaque ressource, avec ses sections et catégories liées, au fichier CSV
    resources.forEach((resource) => {
      resource.sections.forEach((section) => {
        resource.categories.forEach((category) => {
          csvStream.write([
            resource.link,   // Lien de la ressource
            category.title,  // Titre de la catégorie liée
            section.title,   // Titre de la section liée
          ]);
        });
      });
    });

    // Fin du flux
    csvStream.end();

    console.log(`Export réussi. Fichier CSV créé : ${csvFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'exportation des ressources :', error);
  } finally {
    // Fermeture du client Prisma
    await prisma.$disconnect();
  }
}

// Exécution du programme
exportResourcesToCSV();
