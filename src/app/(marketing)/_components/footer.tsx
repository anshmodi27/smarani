import { Button } from "@/components/ui/button";
import Logo from "./logo";

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50">
      <div className="md:ml-auto w-full justify-between flex flex-col sm:flex-row items-center gap-x-5">
        <Logo />
        <div className="flex items-center gap-x-2 justify-center text-muted-foreground">
          <Button variant="ghost" size="sm">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm">
            terms & Conditions
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Footer;
