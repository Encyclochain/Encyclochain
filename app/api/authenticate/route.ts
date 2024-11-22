import { NextRequest, NextResponse } from 'next/server';
import { importJWK, jwtVerify, JWK } from 'jose';
import prisma from '../../../lib/db';

// Interface pour le payload du JWT
interface PrivyPayload {
  sub: string; // ID utilisateur unique (Privy DID)
  linked_accounts?: {
    farcaster?: { username: string };
    github?: { username: string };
    twitter?: { username: string };
  };
  custom_metadata?: string;
  [key: string]: any; // Permet d'autres propriétés non documentées
}

// Fonction pour récupérer la clé publique
async function getKey(header: any) {
  console.log('Décodage du header pour récupérer le kid :', header);

  const res = await fetch('https://auth.privy.io/api/v1/apps/cm3hg23jk075g94fpypzmp6g9/jwks.json');
  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des JWKS.');
  }

  const jwks = await res.json();
  console.log('JWKS récupéré :', jwks);

  const signingKey = jwks.keys.find((key: any) => key.kid === header.kid);
  if (!signingKey) {
    console.error('Clé de signature introuvable pour le kid :', header.kid);
    throw new Error('Clé de signature introuvable.');
  }

  console.log('Clé de signature trouvée :', signingKey);

  // Transformer la clé JWKS en CryptoKey
  const cryptoKey = await importJWK(signingKey as JWK, 'ES256');
  console.log('Clé transformée en CryptoKey :', cryptoKey);

  return cryptoKey;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Requête reçue dans /api/authenticate');

    const token = request.cookies.get('privy-id-token')?.value;
    console.log('Token récupéré depuis les cookies :', token);

    if (!token) {
      console.error('Token manquant');
      return NextResponse.json({ message: 'Token manquant' }, { status: 400 });
    }

    const decodedHeader = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
    console.log('Header du token décodé :', decodedHeader);

    const signingKey = await getKey(decodedHeader);

    const { payload } = await jwtVerify(token, signingKey, {
      issuer: 'privy.io',
      audience: 'cm3hg23jk075g94fpypzmp6g9',
    }) as { payload: PrivyPayload };

    console.log('Payload du token décodé :', payload);

    const privyUserId = payload.sub;
    let username = null;

    // Vérifier si linked_accounts est une chaîne ou un objet
    let linkedAccounts;
    if (typeof payload.linked_accounts === 'string') {
      linkedAccounts = JSON.parse(payload.linked_accounts);
    } else {
      linkedAccounts = payload.linked_accounts;
    }

    console.log('linked_accounts parsé :', linkedAccounts);

    // Chercher le username dans linked_accounts
    username = linkedAccounts.find((account: any) => account.type === 'twitter_oauth')?.username;

    console.log('ID utilisateur (Privy ID) :', privyUserId);
    console.log('Nom d\'utilisateur :', username);

    if (!privyUserId || !username) {
      console.error('Données utilisateur manquantes. Payload reçu :', payload);
      return NextResponse.json({ message: 'Données utilisateur manquantes' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { privyUserId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          privyUserId,
          name: username,
        },
      });
      console.log('Nouvel utilisateur créé :', user);
    } else {
      console.log('Utilisateur existant :', user);
    }

    return NextResponse.json({ message: 'Utilisateur authentifié', user }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    return NextResponse.json({ message: 'Erreur interne ou token invalide' }, { status: 500 });
  }
}
