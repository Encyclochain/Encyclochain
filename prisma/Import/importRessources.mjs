// Importation des modules nécessaires
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from '@fast-csv/parse';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Fonction pour importer les ressources depuis un CSV
async function importResourcesFromCSV() {
  const csvFilePath = '../resources.csv'; // Chemin vers le fichier CSV

  const resources = []; // Tableau pour stocker les données du CSV

  // Lire et parser le fichier CSV
  fs.createReadStream(csvFilePath)
    .pipe(parse({ headers: true })) // Lecture du CSV avec en-tête
    .on('data', (row) => {
      const link = row.Link?.trim();  // Vérifie que la colonne Link existe et est propre
      const categoryTitle = row.Category?.trim();  // Vérifie que la colonne Category existe et est propre
      const sectionTitle = row.Section?.trim();  // Vérifie que la colonne Section existe et est propre

      // Ajout uniquement si toutes les données sont présentes
      if (link && categoryTitle && sectionTitle) {
        resources.push({
          link,
          categoryTitle,
          sectionTitle,
        });
      } else {
        console.warn(`Données manquantes ou invalides pour la ressource : Link="${link}", Category="${categoryTitle}", Section="${sectionTitle}"`);
      }
    })
    .on('end', async () => {
      console.log(`Import de ${resources.length} ressources valides depuis ${csvFilePath}`);

      try {
        // Pour chaque ressource, on recherche la section et la catégorie correspondantes et on crée la ressource
        for (const { link, categoryTitle, sectionTitle } of resources) {
          // Recherche de la section par son titre
          const section = await prisma.section.findFirst({
            where: { title: sectionTitle },
          });

          // Recherche de la catégorie par son titre
          const category = await prisma.category.findFirst({
            where: { title: categoryTitle },
          });

          // Si la section et la catégorie existent, on crée la ressource
          if (section && category) {
            await prisma.resource.create({
              data: {
                link,  // Lien de la ressource
                authorId: 1, // Assigner un auteur par défaut
                typeId: 1,   // Assigner un type par défaut
                sections: {
                  connect: { id: section.id },  // Lien avec la section
                },
                categories: {
                  connect: { id: category.id }, // Lien avec la catégorie
                },
              },
            });
            console.log(`Ajouté : Ressource "${link}" dans la catégorie "${categoryTitle}" et la section "${sectionTitle}"`);
          } else {
            console.warn(`Ressource "${link}" non ajoutée : Section ou catégorie introuvable.`);
          }
        }

        console.log('Import réussi.');
      } catch (error) {
        console.error('Erreur lors de l\'importation des ressources :', error);
      } finally {
        await prisma.$disconnect();
      }
    })
    .on('error', (error) => {
      console.error('Erreur lors de la lecture du fichier CSV :', error);
    });
}

// Exécution du programme
importResourcesFromCSV();
