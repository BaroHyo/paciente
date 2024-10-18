import React, { useEffect, useState } from 'react';
import { useErrorStore } from '@/stores/useErrorStore';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const ErrorAlert: React.FC = () => {
    const error = useErrorStore((state) => state.error);
    const setError = useErrorStore((state) => state.setError);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error]);

    const handleClose = () => {
        setOpen(false);
        setError(null);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <div style={{ display: "none" }}></div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Error Server</AlertDialogTitle>
                    <AlertDialogDescription>
                        {error}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" onClick={handleClose}>Cerrar</Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

