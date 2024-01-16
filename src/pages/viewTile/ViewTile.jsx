import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Card/TitleCard";

import "./viewTile.scss";
import { useEffect } from "react";
import { getStoryData } from "../../store/action";

function ViewTile() {
  const dispatch = useDispatch();
  const titleData = useSelector(
    (state) => state?.oneMinuteStory?.storyData || []
  );

  useEffect(() => {
    dispatch(getStoryData());
  }, [dispatch]);

  const renderTile = (data) => {
    return data?.map((tile, idx) => {
      return (
        <TitleCard
          key={`tile-${idx}`}
          id={tile._id}
          title={tile.title}
          story={tile.story}
          author={tile.author}
          email={tile.email}
        />
      );
    });
  };

  return (
    <div>
      <p className="text-5xl flex justify-center mb-20 mt-20 font-bold">
        STORY DATA
      </p>
      {renderTile(titleData)}
    </div>
  );
}

export default ViewTile;
