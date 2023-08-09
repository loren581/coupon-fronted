
import { useNavigate, useParams } from "react-router-dom";
import "./DeleteTodo.css";

import notifyService from "../../../Services/NotificationService";
import { deletedTaskAction } from "../../../Redux/TaskAppState";
import { useDispatch } from 'react-redux';
import webApiService from "../../../Services/WebApiService";
function DeleteTodo(): JSX.Element {

    const dispatch = useDispatch();

    const params = useParams();
    const id = +(params.id || 0);

    const navigate = useNavigate();

    const yes = () => {
        webApiService.deleteTaskAuth(id)
            .then(() => {
                notifyService.success(`deleted task #${id} successfully`);
                // store.dispatch(deletedTaskAction(id));
                dispatch(deletedTaskAction(id));
                navigate(-1);
            })
            .catch(err => notifyService.error(err))
    }

    const no = () => {
        navigate(-1);
    }

    return (
        <div className="DeleteTodo">
            <h1>Delete Task</h1>
            <p>Are you sure you want to delete todo #{id}?</p>
            <div className="row">
                <button onClick={yes} className="danger">Yes</button>
                <button onClick={no}>Cancel</button>
            </div>

        </div>
    );
}

export default DeleteTodo;
