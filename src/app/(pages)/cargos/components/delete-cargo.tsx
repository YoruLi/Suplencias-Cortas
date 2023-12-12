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
import { Button } from "@/components/ui/button";
import { deleteAction } from "../../../../../actions/delete-action";
import toast from "react-hot-toast";
import { MenuItem } from "@mui/material";

export function DeleteCargo({ cargoId, entity }: { cargoId: string; entity: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <MenuItem className="!text-sm !px-2 text-start">Eliminar cargo</MenuItem>
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
                            toast.promise(deleteAction(entity, cargoId), {
                                loading: "Cargando...",
                                success: "Se eliminó el cargo!",
                                error: e => `Error: ${e.message}`,
                            });
                        }}
                    >
                        Coninuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
