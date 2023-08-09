import { useState } from "react";
import "./HelloFunction.css";
interface HelloFunctionProps{
    profession: string;
}

function HelloFunction(props: HelloFunctionProps): JSX.Element {
    const [num, setNum] = useState<number>(0);
    return (
        <div className="HelloFunction">
            <p>I love {props.profession} using fc</p>
            <p>num : {num }</p>
            <button onClick={()=>setNum(num=>num+1)}>Click</button>
        </div>
    );
}

export default HelloFunction;
