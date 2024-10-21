import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSideType = typeof SHEET_SIDES[number];


type Props = {
  isOpen: boolean;
  side: SheetSideType;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const CustomSheetForm: React.FC<Props> = ({ isOpen, side, title, description, onClose, children }) => {
  return (
    <Sheet open={isOpen} modal={true} onOpenChange={onClose}>
      <SheetContent side={side} onInteractOutside={(event) => event.preventDefault()}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {
            description && (
              <SheetDescription>
                {description}
              </SheetDescription>
            )
          }
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>

  )
}