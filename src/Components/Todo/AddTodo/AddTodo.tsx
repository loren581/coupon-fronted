import "./AddTodo.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoModel } from "../../../Models/Todo";
// import axios from "axios";
// import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { addedTaskAction } from "../../../Redux/TaskAppState";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";
function AddTodo(): JSX.Element {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const schema = zod.object({
        title: zod.string().nonempty("you must enter title"),
        description: zod.string().nonempty("you must enter description"),
        group: zod.string().nonempty("you must enter group"),
        when: zod.string().transform((dateString, ctx) => {
            const date = new Date(dateString);
            if (!zod.date().safeParse(date).success) {
                ctx.addIssue({
                    code: zod.ZodIssueCode.invalid_date,
                })
            }
            return date;
        })

    });


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
        = useForm<TodoModel>({ mode: "all", resolver: zodResolver(schema) });



    const onSubmit: SubmitHandler<TodoModel> = (data: TodoModel) => {

        return webApiService.addTaskAuth(data)
            .then(res => {
                notifyService.success('Danny is 75% fullstack');
                // store.dispatch(addedTaskAction(res.data));
                dispatch(addedTaskAction(res.data));
                navigate("/todos");
            })
            .catch(err => notifyService.error(err))



    };





    return (
        <div className="AddTodo form-look-and-feel">
            <h1>Add new Task</h1>


            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
                {/* <select {...register("color")}>
                    <option>WHITE</option>
                    <option>BALCK</option>
               </select> */}

                {(errors?.title) ? <span>{errors.title.message}</span> : <label htmlFor="title">Title</label>}
                <input {...register("title")} name="title" type="text" placeholder="Title..." />

                {(errors?.description) ? <span>{errors.description.message}</span> : <label htmlFor="description">Description</label>}
                <input {...register("description")} name="description" type="text" placeholder="Description..." />

                {(errors?.group) ? <span>{errors.group.message}</span> : <label htmlFor="group">Group</label>}
                <input {...register("group")} type="text" name="group" placeholder="Group..." />

                {(errors?.when) ? <span>{errors.when.message}</span> : <label htmlFor="when">When</label>}
                <input {...register("when")} name="when" type="datetime-local" placeholder="When..." />
                <button disabled={!isValid || isSubmitting}>ADD</button>
            </form>
        </div>
    );
}

export default AddTodo;
