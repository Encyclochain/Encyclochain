import { useState } from "react";

// SVG pour l'étoile remplie
const StarFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={24}
    height={24}
  >
    <path d="M12 17.75L7.16 20.28l1.15-4.96L4.86 11.4l5.02-.44L12 6.2l2.12 4.76 5.02.44-3.45 3.92 1.15 4.96L12 17.75z" />
  </svg>
);

// SVG pour l'étoile vide
const StarEmpty = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"  // Corrected here
    strokeLinecap="round"  // Corrected here
    strokeLinejoin="round"  // Corrected here
    width={24}
    height={24}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Système de notation par étoiles
export function StarRating({ initialRating = 0 }: { initialRating?: number }) {
  const [rating, setRating] = useState(initialRating);  // État de la note actuelle
  const [hover, setHover] = useState(0);  // État de survol

  return (
    <div className="flex ml-[10px]">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <button
            key={starIndex}
            type="button"
            className="bg-transparent border-none cursor-pointer"
            onClick={() => setRating(starIndex)}  // Modifier la note au clic
            onMouseEnter={() => setHover(starIndex)}  // Survol de l'étoile
            onMouseLeave={() => setHover(0)}  // Fin du survol
          >
            {starIndex <= (hover || rating) ? <StarFilled /> : <StarEmpty />}
          </button>
        );
      })}
    </div>
  );
}
