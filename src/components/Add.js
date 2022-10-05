import { useState } from "react";
import { useAddTodoMutation } from "../redux/slices/todoSlice/todoApi";

export default function Add() {
  const [title, setTitle] = useState("");
  const [addTodo] = useAddTodoMutation();

  const handleAddTodo = async () => {
    try {
      await addTodo({
        title: title,
        complete: false,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-todo">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="add todo..."
      />
      <button onClick={handleAddTodo} className="green-btn">
        Add
      </button>
    </div>
  );
}
