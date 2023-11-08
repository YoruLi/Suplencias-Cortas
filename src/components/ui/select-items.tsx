import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SelectItems({ title, formData, placeholder, children }: { title: string; formData: string; placeholder: string; children: React.ReactNode }) {
    return (
        <Select name={formData}>
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
