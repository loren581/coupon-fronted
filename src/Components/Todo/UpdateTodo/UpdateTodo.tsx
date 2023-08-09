import { useNavigate, useParams } from "react-router-dom";
import "./UpdateTodo.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoModel } from "../../../Models/Todo";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { updatedTaskAction } from "../../../Redux/TaskAppState";
import {  useState } from "react";
import store from "./../../../Redux/Store";
function UpdateTodo(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const [obj] = useState<TodoModel>(store.getState().tasksReducer.tasks.filter(t => t.id === id)[0])
    console.log(obj);
    //todo - from some reason i cannot present the when value!

  //  const defaultValuesObj = { ...obj, when: moment(obj.when).format("DD/MM/YY hh:mm") }; //Spread Operator
    const defaultValuesObj = { ...obj }; //Spread Operator



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





    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<TodoModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<TodoModel> = (data: TodoModel) => {

        return webApiService.updateTaskAuth(id, data)
            .then(res => {
                notifyService.success("Danny is 100% Fullstack!!!")
                dispatch(updatedTaskAction(res.data));
                navigate("/todos");
            })
            .catch(err => notifyService.error(err))



    };





    return (
        <div className="UpdateTodo">
            <h1>Update Existing Task</h1>


            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
                {/* <select {...register("color")}>
        <option>WHITE</option>
        <option>BALCK</option>
   </select> */}

                <label htmlFor="id">Id</label>
                <input name="id" type="text" value={obj.id} disabled={true} />


                {(errors?.title) ? <span>{errors.title.message}</span> : <label htmlFor="title">Title</label>}
                <input {...register("title")} name="title" type="text" placeholder="Title..." />

                {(errors?.description) ? <span>{errors.description.message}</span> : <label htmlFor="description">Description</label>}
                <input {...register("description")} name="description" type="text" placeholder="Description..." />

                {(errors?.group) ? <span>{errors.group.message}</span> : <label htmlFor="group">Group</label>}
                <input {...register("group")} type="text" name="group" placeholder="Group..." />

                {(errors?.when) ? <span>{errors.when.message}</span> : <label htmlFor="when">When</label>}
                <input {...register("when")} name="when" type="datetime-local" placeholder="When..." />
                <button disabled={!isValid || isSubmitting}>Update</button>
            </form>
        </div>
    );
}

export default UpdateTodo;
