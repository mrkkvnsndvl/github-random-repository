import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import LanguageSelector from "./components/shared/LanguageSelector";
import RepositoryDisplay from "./components/shared/RepositoryDisplay";
import { fetchRandomRepository } from "./services/api";

const App = () => {
  // Store the selected language state
  const [selectedLanguage, setSelectedLanguage] = useState("");
  // Store the fetched repository data
  const [repository, setRepository] = useState(null);
  // Store if we are currently fetching a repository
  const [isLoading, setIsLoading] = useState(false);
  // Store any errors
  const [error, setError] = useState(null);

  // Handle when the user selects a new language
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language === "all" ? "" : language);
    setRepository(null);
    setError(null);
  };

  // Handle when the user clicks the fetch button
  const handleFetchRepository = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const repo = await fetchRandomRepository(selectedLanguage);
      setRepository(repo);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            GitHub Random Repository
          </CardTitle>
          <CardDescription className="text-center">
            Discover random GitHub repositories by language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LanguageSelector
            // Pass the selected language to the component
            selectedLanguage={selectedLanguage}
            // Pass the onLanguageChange callback to the component
            onLanguageChange={handleLanguageChange}
          />
          <Button
            // Call the handleFetchRepository function when clicked
            onClick={handleFetchRepository}
            // Disable the button if we are currently fetching a repository
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              // Show a loader and text while we are fetching a repository
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : repository ? (
              // Show a different button text if we already have a repository
              "Fetch Another Repository"
            ) : (
              // Show a different button text if we don't have a repository yet
              "Fetch Repository"
            )}
          </Button>
          {error && (
            <p className="text-red-500 text-center">
              {/* Show the error message if we have one */}
              {error}
            </p>
          )}
          {repository && <RepositoryDisplay repository={repository} />}
        </CardContent>
      </Card>
    </main>
  );
};

export default App;
