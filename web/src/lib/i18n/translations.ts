"use client";

import { useEffect, useState } from "react";
import { AppLanguage, getLanguageFromClient } from "./language";

const translations = {
  en: {
    signIn: "Sign in",
    logout: "Logout",
    loggingOut: "Logging out...",
    adminDashboard: "Admin Dashboard",
    customerDashboard: "Customer Dashboard",
    beekeeperDashboard: "Beekeeper Dashboard",
    labDashboard: "Lab Dashboard",
    articles: "Articles",
    articleCategories: "Article Categories",
    labTests: "Lab Tests",
    labResults: "Lab Results",
    beekeepers: "Beekeepers",
    apiaries: "Apiaries",
    honeyBatches: "Honey Batches",
    products: "Products",
    orders: "Orders",
  },
  fr: {
    signIn: "Se connecter",
    logout: "Se deconnecter",
    loggingOut: "Deconnexion...",
    adminDashboard: "Tableau Admin",
    customerDashboard: "Tableau Client",
    beekeeperDashboard: "Tableau Apiculteur",
    labDashboard: "Tableau Laboratoire",
    articles: "Articles",
    articleCategories: "Categories d'articles",
    labTests: "Tests Laboratoire",
    labResults: "Resultats Laboratoire",
    beekeepers: "Apiculteurs",
    apiaries: "Ruchers",
    honeyBatches: "Lots de miel",
    products: "Produits",
    orders: "Commandes",
  },
} as const;

export function useAppLanguage() {
  const [language, setLanguage] = useState<AppLanguage>("en");

  useEffect(() => {
    setLanguage(getLanguageFromClient());
    const listener = () => setLanguage(getLanguageFromClient());
    window.addEventListener("honeyman-locale-change", listener as EventListener);
    return () => window.removeEventListener("honeyman-locale-change", listener as EventListener);
  }, []);

  return language;
}

export function useAppTranslation() {
  const language = useAppLanguage();
  const t = translations[language];
  return { language, t };
}
