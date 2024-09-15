//all commented because not implemented actually
// components/CryptoWidget.tsx
/*
"use client";

import { useEffect } from "react";

const CryptoWidget: React.FC = () => {
  useEffect(() => {
    // Crée un élément script et l'ajoute au document
    const script = document.createElement("script");
    script.src = "https://www.cryptohopper.com/widgets/js/script";
    script.async = true;
    document.body.appendChild(script);

    // Nettoyage lorsque le composant est démonté
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="cryptohopper-web-widget "
      data-id="2"
      data-coins="bitcoin,ethereum,solana,avalanche-2"
      data-realtime="off"
    ></div>
  );
};

export default CryptoWidget;
*/