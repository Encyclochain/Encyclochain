"use client";

import { useState, useEffect } from "react";

interface SectionInfo {
  color: string;
  whitepaperLink: string;
  twitterLink: string;
  websiteLink: string;
  creator: string;
  consensus: string;
  section: { title: string };
}

interface SectionInfoProps {
  page: string; // Titre de la section
}

export default function SectionInfo({ page }: SectionInfoProps) {
  const [sectionInfo, setSectionInfo] = useState<SectionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectionInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sectionInfo/${encodeURIComponent(page)}`
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
  }, [page]);

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
    section,
  } = sectionInfo;

  return (
    <aside className="w-full lg:w-[30%] bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl mb-4 font-poppins font-semibold">{section.title}</h2>
      <ul className="space-y-2 font-poppins">
        {creator && (
          <li>
            <span className="font-semibold">Creator</span> : {creator}
          </li>
        )}
        {consensus && (
          <li>
            <span className="font-semibold">Consensus</span> : {consensus}
          </li>
        )}
        {color && (
          <li>
            <span className="font-semibold">Color</span> :{" "}
            <span style={{ color }}>{color}</span>
          </li>
        )}
        {whitepaperLink && (
          <li>
            <span className="font-semibold">Whitepaper</span> :{" "}
            <a
              href={whitepaperLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here
            </a>
          </li>
        )}
        {twitterLink && (
          <li>
            <span className="font-semibold">Twitter</span> :{" "}
            <a
              href={twitterLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here
            </a>
          </li>
        )}
        {websiteLink && (
          <li>
            <span className="font-semibold">Website</span> :{" "}
            <a
              href={websiteLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the website
            </a>
          </li>
        )}
      </ul>
    </aside>
  );
}
