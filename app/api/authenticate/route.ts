// app/api/authenticate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import prisma from '../../../lib/db'; // Chemin relatif corrigé

const client = jwksClient({
  jwksUri: 'https://auth.privy.io/.well-known/jwks.json',
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, function (err: any, key: any) {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
}

export async function POST(request: NextRequest) {
  console.log('Route API /api/authenticate appelée');

  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      console.log('Token manquant');
      return NextResponse.json({ message: 'Token manquant' }, { status: 400 });
    }

    console.log('Jeton reçu:', token);

    return new Promise((resolve) => {
      jwt.verify(
        token,
        getKey,
        { algorithms: ['RS256'] },
        async (err: any, decoded: any) => {
          if (err) {
            console.error('Erreur de vérification du jeton:', err);
            resolve(NextResponse.json({ message: 'Jeton invalide' }, { status: 401 }));
            return;
          }

          console.log('Jeton décodé:', decoded);

          const privyUserId = decoded.sub;
          console.log('privyUserId:', privyUserId);

          // Récupérer le nom d'utilisateur
          const username =
            decoded.farcaster?.username ||
            decoded.github?.username ||
            decoded.twitter?.username ||
            null;

          console.log('Nom d\'utilisateur:', username);

          try {
            let user = await prisma.user.findUnique({
              where: { privyUserId },
            });

            if (!user) {
              user = await prisma.user.create({
                data: {
                  privyUserId,
                  name: username,
                  // Ajoutez d'autres champs si nécessaire
                },
              });
              console.log('Nouvel utilisateur créé:', user);
            } else {
              console.log('Utilisateur existant:', user);
            }

            resolve(NextResponse.json({ message: 'Utilisateur authentifié', user }, { status: 200 }));
          } catch (error) {
            console.error('Erreur lors de la gestion de l\'utilisateur:', error);
            resolve(NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }));
          }
        }
      );
    });
  } catch (error) {
    console.error('Erreur de requête:', error);
    return NextResponse.json({ message: 'Requête invalide' }, { status: 400 });
  }
}
