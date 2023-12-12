import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function CardT({ data }: { data: any }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div className="rounded-full bg-transparent  ">
                        <Avatar className="w-20 h-20 mx-auto rounded-full">
                            <AvatarImage src="imgs/logo.jpeg" className="" />
                            <AvatarFallback className="bg-transparent text-white">TEC</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-bold">Cargo vacante</h3>
                        <Badge className="mt-1">Full Time</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">Nombre titular: {data.nombreDocente}</p>
                <p>Materia: {data.nombreMateria}</p>
                <p>Horario: {data.horario} hora</p>
                <p>Días: {data.dias}</p>
                <div className="mt-4">
                    <Button variant="outline" asChild>
                        <Link href={"/cargos"}>Ir a cargos</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
