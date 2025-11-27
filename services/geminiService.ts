import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getFashionAdvice = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    return "Désolé, le service d'Assistant Styliste est momentanément indisponible (API Key manquante).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: `Tu es un styliste de mode expert pour "Fripoblech", un site de vente de vêtements de seconde main haut de gamme.
        
        Ton ton doit être :
        - Tendance et dynamique.
        - Encourageant pour la mode durable (seconde main).
        - Professionnel mais accessible.

        Nous vendons trois catégories principales :
        1. Chic (Marques comme Gucci, Dior, Zara, Ralph Lauren).
        2. Sport (Nike, Adidas, Asics).
        3. Chaussures (Sneakers, Bottines, Mocassins).

        Si l'utilisateur cherche quelque chose, suggère des tenues en combinant ces marques et catégories. Sois concis (max 3 phrases).
        Réponds toujours en Français.`,
      }
    });

    return response.text || "Je n'ai pas pu générer de conseil pour le moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de la consultation de votre styliste virtuel.";
  }
};
