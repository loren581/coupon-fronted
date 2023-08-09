//This is TaksAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoModel } from '../Models/Todo';

interface TasksState {
    tasks: TodoModel[];
}

//This is the initialized Task Application State - initialize within empty array
const initialState: TasksState = {
    tasks: [],
};

//These are all possible actions
export enum ActionType {
    GOT_ALL_TASKS = "GOT_ALL_TASKS",
    ADDED_TASK = "ADDED_TASK",
    UPDATED_TASK = "UPDATED_TASK",
    DELETED_TASK = "DELETED_TASK",
    CLEAR_TASKS = "CLEAR_TASKS"
}



const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        gotAllTasksAction(state, action: PayloadAction<TodoModel[]>) {
            state.tasks = action.payload;
        },
        addedTaskAction(state, action: PayloadAction<TodoModel>) {
            state.tasks.push(action.payload);
        },
        updatedTaskAction(state, action: PayloadAction<TodoModel>) {
            const idx = state.tasks.findIndex(t => t.id === action.payload.id);
            state.tasks[idx] = action.payload;
        },
        deletedTaskAction(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        clearAllTasks(state) {
            state.tasks = initialState.tasks;
        }

    },
});


//This is the exported tasks
export const {
    gotAllTasksAction,
    addedTaskAction,
    updatedTaskAction,
    deletedTaskAction,
    clearAllTasks} = tasksSlice.actions;



//Export the reducer
export const tasksReducer = tasksSlice.reducer;