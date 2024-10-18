import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDynamic: React.FC<ModalProps> = ({
  title,
  description,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="sm:max-w-[650px]"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
