import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../redux/slices/userSlice/userSlice";
import Header from "../header/Header";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetUserQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      setName(data?.name);
    }
  }, [data?.name, id]);

  const handleUpdate = async () => {
    try {
      await updateUser({
        id: id,
        name: name,
      }).unwrap();
      navigate("/");
      setName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {isLoading ? (
          <PropagateLoader size={30} color="red" />
        ) : (
          <>
            <div className="add-todo">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
              />
              <button onClick={handleUpdate} className="green-btn">
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
