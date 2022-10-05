import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../redux/slices/todoSlice/todoApi";
import { PropagateLoader } from "react-spinners";
import Header from "./header/Header";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetTodoQuery(id);
  const [updateTodo] = useUpdateTodoMutation();

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (id) {
      setTitle(data?.title);
    }
  }, [data?.title, id]);

  const handleUpdateTodo = async () => {
    try {
      await updateTodo({
        id: id,
        title: title,
      }).unwrap();
      navigate("/");
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {isLoading ? (
          <PropagateLoader size={30} color="#36d7b7" />
        ) : (
          <>
            <div className="add-todo">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                value={title}
              />
              <button onClick={handleUpdateTodo} className="green-btn">
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
