//Function to fetch a preview for a given URL
//The function get the HTML code of the URL and extract the meta tags
export const extractMetaTags = async (url: string) => {

    //declaration of the jsdom object to interact with the HTML
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    //setting up a virtual console to ignore not fatal parsing errors
    const vConsole = new jsdom.VirtualConsole();
    vConsole.on("error", (e: Error) => {
        if (!e.message.includes("Could not parse CSS stylesheet")) {
            console.error("JSDOM Error : ", e);
        }
    });
    vConsole.on("warn", (e: string) => {
        const warning = "JSDOM Warn : " + e;
        console.error(warning);
    });
    vConsole.on("info", (e: string) => {
        const message = "JSDOM Info : " + e;
        console.error(message);
    });

    try {
        // Fetch the content of the URL
        const response = await fetch(url);

        //check if the request returned data, and error if not
        if (!response.ok) {
            console.error(`Failed to fetch URL: ${url}, Status: ${response.status}`);

            //return default data to display into the component
            return {
                title: "Error",
                description: "Error fetching URL",
                image: "nopic",
            };
        }

        const html = await response.text();

        // Parse the HTML using JSDOM
        const dom = new JSDOM(html, {
            virtualConsole: vConsole,
        });
        const document = dom.window.document;

        // Extract meta tags from the document
        const metaTags = Array.from(document.querySelectorAll("meta")).reduce<{ [key: string]: string }>(
            (tags, meta) => {
                const metaElement = meta as HTMLMetaElement;

                // Get the name, property, or itemprop attribute of the meta tag
                const name =
                    metaElement.getAttribute("name") ||
                    metaElement.getAttribute("property") ||
                    metaElement.getAttribute("itemprop");

                // Get the content attribute of the meta tag
                const content = metaElement.getAttribute("content");

                // If both name and content exist, add them to the tags object
                if (name && content) {
                    tags[name] = content;
                }
                return tags;
            },
            {}
        );

        //setting up the data to return with default values
        const res = {
            title:
                document.title ||
                metaTags["og:title"] ||
                metaTags["twitter:title"] ||
                "No title",
            description:
                metaTags.description ||
                metaTags["og:description"] ||
                metaTags["twitter:description"] ||
                "No description",
            image:
                metaTags.image ||
                metaTags["og:image"] ||
                metaTags["twitter:image"] ||
                "nopic",
        };

        //checking description length and croping it if necessary
        //modify reducedLength to change the final length
        const reduceLength = 90;
        var desc = res.description;
        if (desc.length > reduceLength) {
            res.description = desc.substring(0, reduceLength) + "...";
        }

        //return the prepared object containing title, description and image
        return res;
    } catch (error) {
        //handle errors if fetching or parsing fails
        console.error("Error fetching Open Graph details : ", error);
    }
};