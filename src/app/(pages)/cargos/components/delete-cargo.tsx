import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteAction } from "../../../../utils/actions/delete-action";
import toast from "react-hot-toast";
import { MenuItem } from "@mui/material";

export function DeleteCargo({ id, entity, title }: { id: string; entity: string; title: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <MenuItem className="!text-sm !px-2">{title}</MenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Estas realmente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>Esta accion no puede deshacerse. Este cargo se borrará permanentemente.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            toast.promise(deleteAction(entity, id), {
                                loading: "Cargando...",
                                success: "Se eliminó con éxito!",
                                error: e => {
                                    return `Error: ${JSON.parse(e.message).error}`;
                                },
                            });
                        }}
                    >
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
