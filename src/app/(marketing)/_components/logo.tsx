import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={32}
        height={32}
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        alt="Logo"
        width={32}
        height={32}
        className="hidden dark:block"
      />
      <p className={cn("font-bold font-kalam")}>स्मरणी</p>
    </div>
  );
};
export default Logo;
