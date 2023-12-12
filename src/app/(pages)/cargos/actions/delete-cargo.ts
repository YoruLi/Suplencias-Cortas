"use server";

import { revalidatePath } from "next/cache";
import { deleteCargo } from "../api/delete-cargo";

export const deleteAction = async (cargoId: string) => {
    const res = await deleteCargo(cargoId);

    revalidatePath("/cargos");
    return res;
};
