import { useParams } from "react-router-dom";
import FetchFoodById from "./FetchFoodById";

const Details = () => {
  const { id } = useParams();

  return (
    <div>
      <FetchFoodById id={id} />
    </div>
  );
};

export default Details;
