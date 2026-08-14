import Image from "next/image";
import { FaDiscord, FaGithub } from "react-icons/fa";

const SUPPORT_SERVER_URL = "https://discord.com/invite/UePr2KBcFY";
const GITHUB_REPO_URL = "https://github.com/officialboredbot/docs";

export function baseOptions() {
  return {
    links: [
      {
        type: "icon",
        url: SUPPORT_SERVER_URL,
        text: "Support Server",
        label: "Support Server",
        active: "none",
        external: true,
        icon: <FaDiscord className="size-4" />
      },
      {
        type: "icon",
        url: GITHUB_REPO_URL,
        text: "GitHub",
        label: "GitHub",
        active: "none",
        external: true,
        icon: <FaGithub className="size-4" />
      }
    ],
    nav: {
      title: (
        <Image
          src="/logo/bored2d.png"
          alt="bored"
          width={36}
          height={36}
          className="docs-brand-logo"
          priority
        />
      )
    }
  };
}
