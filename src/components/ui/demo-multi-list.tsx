import * as React from "react";
import { MultiSelect } from "./multi-select";

const hours = [
    {
        label: "1ra-2da",
        value: "1ra y 2da",
    },
    {
        label: "3ra-4ta",
        value: "3ra y 4ta",
    },

    {
        label: "5ta",
        value: "5ta",
    },
];

export default function DemoMultiList({ listData }: { listData: any }) {
    const [selected, setSelected] = React.useState<string[]>([]);

    return <MultiSelect options={hours} selected={selected} listData={listData} onChange={setSelected} />;
}
