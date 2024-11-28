"use client";

import { useState, useEffect } from "react";

interface SectionInfoProps {
  page: string; // Represents the current page or topic title.
}

interface TopicInfoData {
  websiteLink: string | null;
  topic: {
    title: string;
  };
}

export default function TopicInfo({ page }: SectionInfoProps) {
  const [topicInfo, setTopicInfo] = useState<TopicInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopicInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/topicInfo/${encodeURIComponent(page)}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: TopicInfoData = await response.json();
        setTopicInfo(data);
      } catch (err: any) {
        console.error("Error fetching topic info:", err);
        setError("Failed to load topic information.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicInfo();
  }, [page]);

  if (loading) {
    return <p className="text-center font-poppins">Loading...</p>;
  }

  if (error) {
    return <p className="text-center font-poppins text-red-500">{error}</p>;
  }

  if (!topicInfo) {
    return <p className="font-poppins">Information not available for this Topic.</p>;
  }

  const { websiteLink, topic } = topicInfo;

  return (
    <aside className="w-full lg:w-[30%] bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4 font-garamond">{topic.title}</h2>
      <ul className="space-y-2">
        {websiteLink && (
          <li className="font-poppins">
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
