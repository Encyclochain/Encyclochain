import { useState } from "react";

// SVG for the filled star (selected state)
const StarFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"  // Fill the star with color when selected
    width={24}
    height={24}
  >
    {/* Star path to represent a filled star */}
    <path d="M12 17.75L7.16 20.28l1.15-4.96L4.86 11.4l5.02-.44L12 6.2l2.12 4.76 5.02.44-3.45 3.92 1.15 4.96L12 17.75z" />
  </svg>
);

// SVG for the empty star (unselected state)
const StarEmpty = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"  // No fill for the empty star
    stroke="currentColor"  // Outline the star with the current color
    strokeWidth="2"  // Thicker stroke width for better visibility
    strokeLinecap="round"  // Rounded line ends
    strokeLinejoin="round"  // Rounded corners
    width={24}
    height={24}
  >
    {/* Star path to represent the outline of an unselected star */}
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// StarRating component for interactive star ratings
export function StarRating({ initialRating = 0 }: { initialRating?: number }) {
  // State to track the selected rating
  const [rating, setRating] = useState(initialRating);
  // State to track the star currently being hovered over
  const [hover, setHover] = useState(0);

  return (
    // Container div for the stars
    <div className="flex ml-[10px]">
      {/* Create an array of 5 stars */}
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;  // 1-based index for stars

        return (
          // Button for each star to allow interaction
          <button
            key={starIndex}  // Key for rendering
            type="button"
            className="bg-transparent border-none cursor-pointer"  // Remove default button styling
            onClick={() => setRating(starIndex)}  // Set rating when clicked
            onMouseEnter={() => setHover(starIndex)}  // Set hover state when mouse enters a star
            onMouseLeave={() => setHover(0)}  // Reset hover state when mouse leaves
          >
            {/* Render filled or empty star based on hover or current rating */}
            {starIndex <= (hover || rating) ? <StarFilled /> : <StarEmpty />}
          </button>
        );
      })}
    </div>
  );
}
