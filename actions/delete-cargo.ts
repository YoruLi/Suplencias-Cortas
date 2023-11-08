"use server";
import { deleteCargo } from "@/components/cargos/api/delete-cargo";
import { revalidatePath } from "next/cache";

export const deleteAction = async (cargoId: string) => {
    const res = await deleteCargo(cargoId);

    return revalidatePath("/cargos");
};
