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
import { deleteAction } from "../../../actions/delete-plan";
import toast from "react-hot-toast";

export function DeleteCargo({ cargoId, entity }: { cargoId: string; entity: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Eliminar cargo</Button>
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
