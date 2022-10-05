import { useState } from "react";
import { useAddUserMutation } from "../../redux/slices/userSlice/userSlice";

export default function AddUser() {
  const [name, setName] = useState("");
  const [addUser] = useAddUserMutation();

  const handleAdd = async () => {
    try {
      await addUser({
        name: name,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-todo">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="add user..."
      />
      <button onClick={handleAdd} className="green-btn">
        Add
      </button>
    </div>
  );
}
