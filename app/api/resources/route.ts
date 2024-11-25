import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';
import prisma from '@/lib/db';

// Fonction pour récupérer la clé publique via JWKS
async function getPublicKey(header: any): Promise<CryptoKey> {
  const jwksUrl = 'https://auth.privy.io/api/v1/apps/cm3hg23jk075g94fpypzmp6g9/jwks.json';
  const response = await fetch(jwksUrl);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les JWKS.');
  }

  const jwks = await response.json();
  const signingKey = jwks.keys.find((key: any) => key.kid === header.kid);

  if (!signingKey) {
    throw new Error('Clé de signature introuvable.');
  }

  return (await importJWK(signingKey, 'ES256')) as CryptoKey; // Force le typage à CryptoKey
}

// Fonction pour vérifier et décoder le token JWT
async function decodeToken(token: string): Promise<string | null> {
  try {
    const decodedHeader = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
    const publicKey = await getPublicKey(decodedHeader);

    const { payload } = await jwtVerify(token, publicKey, {
      issuer: 'privy.io',
      audience: 'cm3hg23jk075g94fpypzmp6g9', // Ton App ID Privy
    });

    return payload.sub as string; // Retourne l'ID utilisateur (sub)
  } catch (error) {
    console.error('Erreur lors de la validation du token :', error);
    return null;
  }
}

// Middleware pour extraire l'utilisateur à partir du token
async function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get('privy-id-token')?.value;

  if (!token) {
    return null;
  }

  return await decodeToken(token);
}

// Handler principal pour gérer la requête POST
export async function POST(req: NextRequest) {
  try {
    // Vérification de l'authentification
    const userId = await getUserFromRequest(req);

    if (!userId) {
      return NextResponse.json(
        { message: 'Vous devez être authentifié pour soumettre une ressource.' },
        { status: 401 }
      );
    }

    // Lecture et validation des données envoyées dans le corps de la requête
    const body = await req.json();
    const { link, sectionTitle, categoryId, typeId } = body;

    if (!link || !sectionTitle || !categoryId) {
      return NextResponse.json(
        { message: 'Les données requises sont manquantes.' },
        { status: 400 }
      );
    }

    // Utilisation d'un typeId par défaut si non fourni
    const resolvedTypeId = typeId ?? 1;

    // Création de la ressource dans la base de données
    const newResource = await prisma.resource.create({
      data: {
        link,
        sections: {
          connect: { title: sectionTitle }, // Connexion à la section via le titre unique
        },
        categories: {
          connect: { id: parseInt(categoryId, 10) }, // Connexion à la catégorie via l'ID
        },
        author: {
          connect: { privyUserId: userId }, // Associe l'utilisateur via son Privy ID
        },
        Type: {
          connect: { id: resolvedTypeId }, // Connexion au type via l'ID (ou valeur par défaut)
        },
      },
      include: {
        sections: true,
        categories: true,
        author: true,
      },
    });

    // Retourner la réponse avec la ressource créée
    return NextResponse.json({ message: 'Ressource ajoutée avec succès', newResource });
  } catch (error) {
    console.error('Erreur lors de la création de la ressource :', error);
    return NextResponse.json(
      { message: 'Erreur interne lors de la création de la ressource.' },
      { status: 500 }
    );
  }
}
