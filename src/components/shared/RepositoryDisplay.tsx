import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, GitFork, Star } from "lucide-react";

// Interface defining the shape of a repository object
interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
}

// Props for the RepositoryDisplay component
interface RepositoryDisplayProps {
  repository: Repository;
}

const RepositoryDisplay: React.FC<RepositoryDisplayProps> = ({
  repository,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl truncate">
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {repository.name}
          </a>
        </CardTitle>
        <CardDescription>{repository.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {/* Badge displaying the number of stars */}
          <Badge variant="secondary" className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {repository.stargazers_count.toLocaleString()}
          </Badge>
          {/* Badge displaying the number of forks */}
          <Badge variant="secondary" className="flex items-center">
            <GitFork className="w-4 h-4 mr-1" />
            {repository.forks_count.toLocaleString()}
          </Badge>
          {/* Badge displaying the number of open issues */}
          <Badge variant="secondary" className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {repository.open_issues_count.toLocaleString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepositoryDisplay;
