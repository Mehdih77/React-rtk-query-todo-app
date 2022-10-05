import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateCompleteTodoMutation,
} from "../redux/slices/todoSlice/todoApi";
import Add from "./Add";

export default function ListTwo() {
  const { data, isLoading } = useGetTodosQuery();

  const [deleteTodo] = useDeleteTodoMutation();
  const [updateCompleteTodo] = useUpdateCompleteTodoMutation();

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo({
        id: id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeComplete = async (item) => {
    try {
      await updateCompleteTodo({
        ...item,
        complete: !item.complete,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Add />
      <div className="list">
        {isLoading ? (
          <PropagateLoader size={30} color="#36d7b7" />
        ) : (
          <>
            {data?.map((item) => (
              <div key={item.id} className="list-item">
                <input
                  type="checkbox"
                  checked={item.complete}
                  onChange={() => handleChangeComplete(item)}
                />
                <span>{item.title}</span>
                <button
                  onClick={() => handleDeleteTodo(item.id)}
                  className="red-btn">
                  DELETE
                </button>
                <Link to={`/edit/${item.id}`} className="blue-btn">
                  EDIT
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
      <Link to="/">Go to List page</Link>
    </div>
  );
}
