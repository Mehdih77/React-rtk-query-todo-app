import { useState } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} from "../../redux/slices/userSlice/userSlice";
import AddUser from "./AddUser";

export default function UsersList() {
  const [skip, setSkip] = useState(true);
  const { data, isLoading, isUninitialized, currentData } = useGetUsersQuery(
    "",
    {
      skip,
    }
  );
  const handleClick = () => {
    setSkip(false);
  };

  // const [trigger, result, { isLoading, isError, data, error }] =
  //   useLazyGetUsersQuery();
  // const handleGetData = async () => {
  //   await trigger();
  // };
  // console.log(result.data);

  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async (id) => {
    try {
      // await deleteUser(id).unwrap(); >>>>>>> for this we should just pass id to useDeleteUserMutation
      await deleteUser({
        id: id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AddUser />
      <div className="list">
        {isUninitialized ? (
          <button className="yellow-btn" onClick={handleClick}>GET DATA</button>
        ) : isLoading ? (
          <PropagateLoader size={30} color="red" />
        ) : (
          <>
            {data?.map((item) => (
              <div key={item.id} className="list-item">
                <span>{item.name}</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="red-btn">
                  DELETE
                </button>
                <Link to={`/edit-user/${item.id}`} className="blue-btn">
                  EDIT
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
