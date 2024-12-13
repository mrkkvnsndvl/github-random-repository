import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

// Interface for a language
interface Language {
  title: string;
  value: string;
}

// Interface for the LanguageSelector component
interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        // Fetch languages from GitHub
        const response = await fetch(
          "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch languages");
        }

        // Parse JSON response
        const data: Language[] = await response.json();

        // Preprocess languages to ensure "All Languages" has a non-empty value and remove duplicates
        const uniqueLanguages = data.reduce(
          (acc: Language[], lang: Language) => {
            if (lang.title === "All Languages") {
              // Set value to "all" for "All Languages"
              lang.value = "all";
            }
            if (!acc.some((item) => item.value === lang.value)) {
              // Add language to the list if it doesn't already exist
              acc.push(lang);
            }
            return acc;
          },
          []
        );
        setLanguages(uniqueLanguages);
      } catch (err) {
        setError("Failed to load languages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch languages on mount
    fetchLanguages();
  }, []);

  // Show loading state if languages are still being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading languages...</span>
      </div>
    );
  }

  // Show error message if there was an error fetching languages
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  // Render the language selector
  return (
    <Select value={selectedLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
