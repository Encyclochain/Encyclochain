// Importing the Next.js optimized Image component for loading images
import Image from "next/image";

// Importing the image assets (Twitter and Discord logos) from the local filesystem
import twitter from "../assets/Social/twitter.svg"; // Twitter logo
import discord from "../assets/Social/Discord.svg"; // Discord logo

// The Social component accepts a 'design' prop for custom styling.
export function Social({ design }: { design: string }) {
    return (
        // 'design' is applied as a class to the div container for dynamic styling.
        <div className={design}>
            {/* Twitter link with the Image component from Next.js for optimized loading */}
            <a href="https://x.com/Encyclochain" target="_blank">
                {/* Renders the Twitter logo image. 
                    - 'dark:invert' ensures the image inverts in dark mode for better visibility.
                    - 'priority' optimizes loading of this image.
                */}
                <Image
                    src={twitter}
                    alt="Twitter Logo"
                    className="dark:invert"
                    width={20}
                    height={24}
                    priority
                />
            </a>

            {/* Discord logo image, but without a link */}
            <Image
                src={discord}
                alt="Discord Logo"
                className="dark:invert"
                width={20}
                height={24}
                priority
            />
        </div>
    );
}
