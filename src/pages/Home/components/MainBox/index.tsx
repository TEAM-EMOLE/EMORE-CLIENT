import { useState } from "react"
import MonthBar from "./MonthBar"

export default function MainBox() {
    const today = new Date();

    const [month, setMonth] = useState<number>(today.getMonth() + 1);
    return (
    <div className="w-11/12 h-3/5 flex flex-col justify-center items-center my-[10px] ㅡ border-2">
        <MonthBar month={month} setMonth={setMonth} />
        <div className="w-4/5 h-4/5 my-5 flex justify-center items-center gap-x-2 border-2" >
            <p>GraphBox</p>
            <p>GraphLegend</p>
        </div>
    </div>
    )
}
