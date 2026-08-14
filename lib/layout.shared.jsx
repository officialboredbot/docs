import Image from "next/image";
import { FaDiscord } from "react-icons/fa";

const SUPPORT_SERVER_URL = "https://discord.com/invite/UePr2KBcFY";

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
