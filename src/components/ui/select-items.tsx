import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectItemsPros {
    title?: string;
    formData?: string;
    placeholder?: string;
    children: React.ReactNode;
    setValueForm?: any;
}
export function SelectItems(props: SelectItemsPros) {
    const { formData, children, title, placeholder } = props;
    return (
        <Select
            name={formData}
            {...(props.setValueForm && {
                onValueChange: e => {
                    props.setValueForm(props.formData, e);
                },
            })}
        >
            <SelectTrigger className="min-w-[180px]  remove-ring">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className=" overflow-hidden overflow-y-auto max-h-[200px] w-full">
                <SelectGroup>
                    <SelectLabel>{title}</SelectLabel>
                    {children}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
