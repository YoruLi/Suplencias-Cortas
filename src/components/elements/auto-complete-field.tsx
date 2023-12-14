"use client";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AutoComplete from "@mui/material/Autocomplete";
import { Box, Grid, TextField, Typography, debounce } from "@mui/material";
import { getTeachers } from "../../app/(pages)/docentes/api/get-teachers";

import { UserIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface RHFAutocompleteFieldProps<TField extends FieldValues> {
    control?: Control<TField>;
    name: Path<TField>;
    placeholder?: string;
    onChange?: (id: string | null) => void;

    setValueForm: any;
}

export const AutoCompleteField = <TField extends FieldValues>(props: RHFAutocompleteFieldProps<TField>) => {
    const [value, setValue] = React.useState<any | null>(null);
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState<readonly any[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const fetch = React.useMemo(
        () =>
            debounce(async (request: { input: string }, callback: (results?: readonly any[]) => void) => {
                try {
                    const results = await getTeachers({ query: request.input });

                    callback(results || []);
                } catch (error) {
                    console.error("Error fetching teachers:", error);
                }
            }, 1000),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === "") {
            return setOptions(value ? [value] : []);
        }
        fetch({ input: inputValue }, (results?: readonly any[]) => {
            if (active) {
                let newOptions: readonly any[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });
        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <>
            <Controller
                control={props.control}
                name={props.name}
                render={({ field, fieldState: { error } }) => {
                    const { onChange, value, ref } = field;

                    return (
                        <>
                            <AutoComplete
                                disablePortal
                                id="teacher-demo"
                                autoComplete
                                filterOptions={x => x}
                                isOptionEqualToValue={(option, value) => {
                                    return option.idDocentes === value.idDocentes;
                                }}
                                getOptionLabel={option => (typeof option === "string" ? option : option.nombreCompleto || "")}
                                options={options}
                                noOptionsText="No se encontraron docentes..."
                                onChange={(event: any, newValue: any | null) => {
                                    onChange(newValue);
                                    const params = new URLSearchParams(searchParams);
                                    params.set("docente", newValue?.idDocentes);
                                    router.replace(`${pathname}?${params.toString()}`);
                                    props.setValueForm("docentes", newValue?.idDocentes);
                                }}
                                inputValue={inputValue}
                                onInputChange={(_, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                renderInput={params => <TextField {...params} label={props.placeholder} inputRef={ref} />}
                                renderOption={({ ...props }, option) => {
                                    return (
                                        <li {...props}>
                                            <Grid container alignItems="center">
                                                <Grid item sx={{ display: "flex", width: 44 }}>
                                                    <UserIcon />
                                                </Grid>
                                                <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                                                    <Box component="span">{option.nombreCompleto}</Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {option.nombreCompleto}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </li>
                                    );
                                }}
                            />
                        </>
                    );
                }}
            />
        </>
    );
};
