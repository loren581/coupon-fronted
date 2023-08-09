import { useEffect, useState } from "react";
import "./TodoList.css";
import { TodoModel } from "../../../Models/Todo";
// import axios from "axios";
// import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import TodoCard from "../TodoCard/TodoCard";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import store from "./../../../Redux/Store";
import { gotAllTasksAction } from "../../../Redux/TaskAppState";
import { useDispatch } from 'react-redux';
import webApiService from "../../../Services/WebApiService";

function TodoList(): JSX.Element {
    // State = React Mechanism for managing data in component
    const [todos, setTodos] = useState<TodoModel[]>(store.getState().tasksReducer.tasks);

    const dispatch = useDispatch();

    // Effect = very very very very long operation...
    useEffect(() => {

        if (todos.length > 0) {
            return;
        }

        webApiService.getAllTasksAuth()
            .then(res => {
                notifyService.success('Woho I got some tasks');
                setTodos(res.data);
                // store.dispatch(gotAllTasksAction(res.data));
                dispatch(gotAllTasksAction(res.data));
                console.log(res.data);
            })
            .catch(()=>{console.log("");})

    }, []);

    return (
        <div className="TodoList">
            <h1>Todo List</h1>

            {
                (todos.length !== 0) ?

                    todos.map((t, idx) => <TodoCard key={`todo-card-${idx}`} todo={t} />) :
                    <EmptyView
                        title={"No Items Found"}
                        description={"there are no tasks available right now"} />
            }
        </div>
    );
}

export default TodoList;
