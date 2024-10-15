import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"


interface ModalProps {
    title: string;
    description: string;
    children: React.ReactNode;
    onSave: () => void;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalDynamic: React.FC<ModalProps> = ({ title, description, children, onSave, isOpen, onClose }) => {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
            modal={true}>
            <DialogContent onInteractOutside={(event) => event.preventDefault()} className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {children}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
