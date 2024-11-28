"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

interface SectionInfo {
  color: string | null;
  imageLink: string | null;
}

interface Section {
  id: number;
  title: string;
  sectionInfo: SectionInfo | null;
  resourcesCount: number;
  categoriesCount: number;
}

interface Topic {
  id: number;
  title: string;
  sections: Section[];
}

interface SectionSelectProps {
  page: string;
}

export default function SectionSelect({ page }: SectionSelectProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sectionList/${encodeURIComponent(page)}`
        );

        if (!response.ok) {
          throw new Error(`Erreur : ${response.statusText}`);
        }

        const data: Topic = await response.json();
        setTopic(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des sections :", err);
        setError("Impossible de charger les sections.");
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [page]);

  if (loading) {
    return <p className="text-center font-poppins">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center font-poppins text-red-500">{error}</p>;
  }

  if (!topic) {
    return <p className="text-center font-poppins">Aucune section trouvée pour ce type.</p>;
  }

  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full">
      <h2 className="text-3xl font-bold text-black mb-6 lg:text-left text-center font-garamond">
        {topic.title}
      </h2>
      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 text-black text-base">Section</TableHead>
            <TableHead className="py-2 text-black text-base">Ressources</TableHead>
            <TableHead className="py-2 text-black text-base">Category</TableHead>
            <TableHead className="py-2 text-black text-base">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topic.sections.map((section) => (
            <TableRow key={section.id}>
              <TableCell className="py-2">
                <Link
                  href={`/section/${section.title}`}
                  className="contents text-black hover:bg-gray-100 font-poppins"
                >
                  <div className="flex items-center">
                    <div className="w-[30px] h-[30px] relative mr-4">
                      {section.sectionInfo?.imageLink ? (
                        <Image
                          src={section.sectionInfo.imageLink}
                          alt={`Logo ${section.title}`}
                          width={80}
                          height={80}
                          style={{ objectFit: "cover" }}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-black font-bold text-xl font-garamond">
                          {section.title.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="text-base font-poppins">{section.title}</div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="py-2 font-poppins">{section.resourcesCount}</TableCell>
              <TableCell className="py-2 font-poppins">{section.categoriesCount}</TableCell>
              <TableCell className="py-2 font-poppins">À définir</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
