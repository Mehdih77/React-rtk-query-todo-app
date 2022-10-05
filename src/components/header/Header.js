import { useGetHeaderQuery } from "../../redux/slices/headerSlice/HeaderSlice";

export default function Header() {
  const { data, isLoading } = useGetHeaderQuery();

  return (
    <div className="header">
      catched data forever:
      {isLoading ? "is loading..." : JSON.stringify(data)}
    </div>
  );
}
