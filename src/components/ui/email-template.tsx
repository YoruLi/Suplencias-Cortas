import * as React from "react";

interface EmailTemplateProps {
    firstName: string;
    signature: string;
    days: string;
    hours: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ days, firstName, hours, signature }: EmailTemplateProps) => {
    const body = `
Has sido seleccionado para suplir un cargo en la institución. Seguí leyendo si estás interesado! \n
Se necesita cubrir el cargo de la materia ${signature} en el/los días ${days} en la ${hours} hora
`;

    return (
        <div>
            <h1>Fuiste seleccionado como candidato, {firstName}!</h1>

            <p>
                <pre>{body}</pre>
            </p>
            <p className="line-clamp-2 font-bold">
                Luego de haber recibido este correo, tienes dos días limites para responder. Pasado el tiempo limite la solicitud expira y se selecciona a otro candidato.
            </p>
        </div>
    );
};
