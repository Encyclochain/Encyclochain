"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import Image from "next/image";

interface SectionInfo {
  color: string;
  imageLink: string | null;
}

interface Section {
  id: number;
  title: string;
  _count: {
    resources: number;
    categories: number;
  };
  sectionInfo: SectionInfo | null;
}

interface Topic {
  id: number;
  title: string;
  sections: Section[];
}

export default function Alltopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homeTopics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des topics : ${response.statusText}`);
        }

        const data: Topic[] = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des topics :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return <p className="text-center font-poppins">Chargement...</p>;
  }

  if (topics.length === 0) {
    return <p className="text-center font-poppins">Aucun topic trouvé.</p>;
  }

  return (
    <div className="mt-[5%] mb-[5%] p-[50px] w-full ">
      {topics.map((topic) => (
        <div key={topic.id} className="mb-8">
          <h2 className="text-3xl font-bold font-garamond text-black mb-6 lg:text-left text-center">
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
                  <TableCell className="py-2 w-[200px]">
                    <Link
                      href={`/section/${section.title}`}
                      className="contents text-black hover:bg-gray-100 font-poppins"
                    >
                      <div className="flex items-center">
                        <div className="w-[30px] h-[30px] relative mr-4 flex items-center justify-center bg-gray-200 rounded-full">
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
                  <TableCell className="py-2 w-[200px] font-poppins">{section._count.resources}</TableCell>
                  <TableCell className="py-2 w-[200px] font-poppins">{section._count.categories}</TableCell>
                  <TableCell className="py-2 w-[200px] font-poppins">Soon</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
