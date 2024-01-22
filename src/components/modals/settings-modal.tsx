"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSetting } from "../../../hooks/use-setting";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

const SettingModal = () => {
  const settings = useSetting();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold font-cabin">Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label className="font-cabin">Appearance</Label>
            <span className="font-cabin text-muted-foreground text-sm">
              Customize how
              <span className={"font-kalam"}>&nbsp;स्मरणी&nbsp;</span>looks on
              you device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SettingModal;
