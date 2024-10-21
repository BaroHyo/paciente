import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
    title: string;
    description?: string;
    children?: React.ReactNode; // Para incluir contenido dinámico dentro del Card
}

export const CustomCard: React.FC<CardProps> = ({ title, description, children }) => {
    return (
        <Card x-chunk="dashboard-06-chunk-0" className="h-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && (<CardDescription>
                    {description}
                </CardDescription>)}
                <CardContent>
                    {children}
                </CardContent>
            </CardHeader>
        </Card>
    );
};