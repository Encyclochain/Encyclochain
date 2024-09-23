import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'fast-csv';

const prisma = new PrismaClient();

// Fonction pour vérifier l'existence de l'utilisateur avec l'ID 1
async function checkDefaultAuthor() {
  const author = await prisma.user.findUnique({
    where: { id: 1 },
  });

  // Si l'utilisateur avec id = 1 n'existe pas, afficher une erreur et arrêter
  if (!author) {
    throw new Error('User with id = 1 does not exist. Please create this user or modify the authorId.');
  }
}

// Fonction pour normaliser les strings (supprimer les espaces en trop et convertir en minuscules)
function normalizeString(str) {
  return str.trim().toLowerCase();
}

// Fonction pour importer les ressources depuis un CSV sans ajouter de catégories ni de sections
async function importResourcesFromCSV(filePath) {
  // Vérifier que l'auteur avec id = 1 existe
  await checkDefaultAuthor();

  const stream = fs.createReadStream(filePath);
  const csvStream = csv.parse({ headers: true });

  stream.pipe(csvStream)
    .on('data', async (row) => {
      const { Link, Category, Section } = row;

      try {
        await prisma.$transaction(async (prisma) => {
          // Normaliser les données de la catégorie et de la section
          const normalizedCategory = normalizeString(Category);
          const normalizedSection = normalizeString(Section);

          // Chercher la catégorie existante
          const category = await prisma.category.findFirst({
            where: {
              title: {
                equals: normalizedCategory,
                mode: 'insensitive', // Ignore la casse
              },
            },
          });

          // Chercher la section existante
          const section = await prisma.section.findFirst({
            where: {
              title: {
                equals: normalizedSection,
                mode: 'insensitive', // Ignore la casse
              },
            },
          });

          // Si la catégorie et la section existent, insérer la ressource
          if (category && section) {
            await prisma.resource.create({
              data: {
                link: Link,
                categories: {
                  connect: { id: category.id }, // Connecter à la catégorie existante
                },
                sections: {
                  connect: { id: section.id }, // Connecter à la section existante
                },
                authorId: 1,  // Valeur par défaut pour authorId (assurez-vous qu'il existe)
                typeId: 1,    // Valeur par défaut pour typeId
              },
            });

            console.log(`Successfully inserted resource with link: ${Link}`);
          } else {
            console.error(`Category or Section not found for row: ${Link}, ${Category}, ${Section}`);
          }
        });

      } catch (error) {
        console.error(`Error processing row: ${Link}, ${Category}, ${Section}`);
        console.error(error);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

// Appel de la fonction pour importer un fichier CSV
const filePath = 'resources.csv'; // Remplacez par le chemin de votre fichier CSV
importResourcesFromCSV(filePath)
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
