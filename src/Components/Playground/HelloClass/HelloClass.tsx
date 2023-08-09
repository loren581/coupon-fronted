import { Component } from "react";
import "./HelloClass.css";

interface HelloClassProps{
    profession: string;
}
interface HelloClassState{
    num: number;
}
class HelloClass extends Component<HelloClassProps,HelloClassState> {

    public constructor(props: HelloClassProps) {
        super(props);
        this.state = {
            num:0
        }
    }
    public render(): JSX.Element {
        return (
            <div className="HelloClass">
                <p>I Love {this.props.profession} using cc</p>
                <p>num : {this.state.num}</p>
                <button onClick={() => {
                    this.setState((prevState) => ({
                        num: prevState.num + 1
                     }))

                }}>Click</button>
            </div>
        );
    }
}

export default HelloClass;
