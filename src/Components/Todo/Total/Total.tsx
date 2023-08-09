import "./Total.css";
import { useSelector } from 'react-redux';
import { RootState } from './../../../Redux/Store'
function Total(): JSX.Element {


    // const [total, setTotal] = useState(0);
    const total = useSelector((state: RootState) => state.tasksReducer.tasks.length);


    // useEffect(() => {
    //     axios.get<number>(urlService.todo + "/" + "count")
    //         .then(res => setTotal(res.data))
    //         .catch(err => console.log(err));

    // }, []);
    return (
        <div className="Total">
            {
                (total) ? <p>Total : {total}</p> : <p>No Values</p>
            }
        </div>
    );
}

export default Total;


