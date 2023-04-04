import { nFormatter } from "@/lib/utils";
import { GitFork, Star } from "lucide-react";
import Image from "next/image";
import { GitHubIcon } from "../../components/icons/social";

export interface GithubRepoProps {
  url: string;
  description: string;
  stars: number;
  forks: number;
}

export default function RepoCard({
  url,
  description,
  stars,
  forks,
}: GithubRepoProps) {
  const [orgName, repoName] = url.replace("https://github.com/", "").split("/");
  return (
    <div className="bg-white not-prose border border-gray-200 my-5 rounded-xl hover:border-gray-700 transition-colors">
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="block p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-normal">
              {orgName}/
              <span className="font-bold text-gray-800">{repoName}</span>
            </p>
            <p className="text-gray-500 font-normal text-sm mt-2">
              {description}
            </p>
          </div>
          <GitHubIcon fill="#71717A" className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="flex justify-between items-end">
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-start space-x-2">
              <Star size={16} className="mt-1.5" />
              <div>
                <p className="text-gray-600 font-semibold">
                  {nFormatter(stars)}
                </p>
                <p className="text-gray-500 font-normal text-xs">Stars</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <GitFork size={16} className="mt-1.5" />
              <div>
                <p className="text-gray-600 font-semibold">
                  {nFormatter(forks)}
                </p>
                <p className="text-gray-500 font-normal text-xs">Forks</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
