"use client";

import { useState, useEffect } from "react";

interface SectionInfo {
  color: string;
  whitepaperLink: string;
  twitterLink: string;
  websiteLink: string;
  creator: string;
  consensus: string;
}

export default function EncyclochainInfo() {
  const [sectionInfo, setSectionInfo] = useState<SectionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectionInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/encyclochainInfo`
        );

        if (!response.ok) {
          throw new Error(`Erreur : ${response.statusText}`);
        }

        const data: SectionInfo = await response.json();
        setSectionInfo(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des informations :", err);
        setError("Impossible de charger les informations.");
      } finally {
        setLoading(false);
      }
    };

    fetchSectionInfo();
  }, []);

  if (loading) {
    return <p className="font-poppins">Chargement...</p>;
  }

  if (error) {
    return <p className="font-poppins text-red-500">{error}</p>;
  }

  if (!sectionInfo) {
    return <p className="font-poppins">Informations non disponibles.</p>;
  }

  const {
    color,
    whitepaperLink,
    twitterLink,
    websiteLink,
    creator,
    consensus,
  } = sectionInfo;

  return (
    <aside className="w-full lg:w-[30%] bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
      <ul className="space-y-2">
        {creator && (
          <li>
            <strong>Créateur</strong> : {creator}
          </li>
        )}
        {consensus && (
          <li>
            <strong>Type de consensus</strong> : {consensus}
          </li>
        )}
        {color && (
          <li>
            <strong>Couleur associée</strong> :{" "}
            <span style={{ color }}>{color}</span>
          </li>
        )}
        {whitepaperLink && (
          <li>
            <strong>Whitepaper</strong> :{" "}
            <a
              href={whitepaperLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le whitepaper
            </a>
          </li>
        )}
        {twitterLink && (
          <li>
            <strong>Twitter</strong> :{" "}
            <a
              href={twitterLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Compte Twitter
            </a>
          </li>
        )}
        {websiteLink && (
          <li>
            <strong>Site officiel</strong> :{" "}
            <a
              href={websiteLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visiter le site
            </a>
          </li>
        )}
      </ul>
    </aside>
  );
}
