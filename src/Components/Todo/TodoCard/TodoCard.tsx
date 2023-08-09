import moment from "moment";
import { TodoModel } from "../../../Models/Todo";
import "./TodoCard.css";
import { Link } from "react-router-dom";

interface TodoCardProps {
    todo: TodoModel;
}

function TodoCard(props: TodoCardProps): JSX.Element {
    return (
        <div className="TodoCard card">
            {/* <p>id : #{props.todo.id}</p> */}
            <h3>{`${props.todo.title} (#${props.todo.id})`} </h3>
            <p>📙&nbsp;description : {props.todo.description}</p>
            <p>📅&nbsp;date : {moment(props.todo.when).format("DD/MM/yy")}</p>
            <p>🕒&nbsp;time : { }{moment(props.todo.when).format("hh:mm")}</p>
            <hr />
            <div className="row">

                <Link to={`/todos/update/${props.todo.id}`}><button>✏️ Edit Todo</button></Link>
                <Link to={`/todos/delete/${props.todo.id}`}> <button>🗑️ Delete Todo</button></Link>
            </div>

        </div>
    );
}

export default TodoCard;
