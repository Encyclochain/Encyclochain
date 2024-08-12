import Image from "next/image";
import twitter from "../assets/Social/twitter.svg";
import discord from "../assets/Social/Discord.svg";

//design to use for the generated block is passed with "design" argument
export function Social({ design }: { design: string }) {
    return (
        <div className={design}>
            <a href="https://x.com/Encyclochain" target="_blank">
                <Image
                    src={twitter}
                    alt="Twitter Logo"
                    className="dark:invert"
                    width={20}
                    height={24}
                    priority
                />
            </a>
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