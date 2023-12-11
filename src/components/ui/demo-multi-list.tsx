import * as React from "react";
import { MultiSelect } from "./multi-select";

export default function DemoMultiList({ options, listData, placeholder }: { options?: any; listData: any; placeholder: string }) {
    const [selected, setSelected] = React.useState<string[]>([]);

    return <MultiSelect placeholder={placeholder} options={options} selected={selected} listData={listData} onChange={setSelected} />;
}
