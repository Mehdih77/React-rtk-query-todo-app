import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { apiSlice } from "../redux/api/apiSlice";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateCompleteTodoMutation,
} from "../redux/slices/todoSlice/todoApi";
import Add from "./Add";
import Header from "./header/Header";
import UsersList from "./users/UsersList";

export default function List() {
  const { data, isLoading } = useGetTodosQuery();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
    dispatch(apiSlice.util.resetApiState()); //! reset all data qeury
  };

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
    <>
      <Header />
      <div className="container">
        <div>
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
          <Link to="/list-two">Go to List Two page</Link>
          <br />
        </div>

        <div>
          <UsersList />
        </div>

        <button onClick={goToLoginPage}>Go to Login page</button>
      </div>
    </>
  );
}
