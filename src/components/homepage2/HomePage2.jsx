import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoryData } from "../../store/action";
import { NavLink } from "react-router-dom";
import OpenAI from "openai";
import { Homepage } from "../../constants/storyConstants";

import "./homepage.scss";

function HomePage2() {
  const dispatch = useDispatch();
  const storyData = useSelector((state) => state?.oneMinuteStory?.storyData);

  useEffect(() => {
    if(storyData?.length === 0) {
      dispatch(getStoryData());
    }
  }, []);

  return (
    <section id="homepage-jsx">
      <div className="main-container">
        <div className="container">
          {/* <p className="warning-container">
                        * This app is still in production, but you can still use
                        demo version of this app.
                    </p> */}
          <p className="title"> {Homepage.TITLE} </p>
          <p className="description">
            {Homepage.DESCRIPTION}
          </p>
          <div className="button-container">
            <Button>
              <NavLink to="/view_stories">{Homepage.VIEW_BUTTON}</NavLink>
            </Button>
            <Button>
              <NavLink to="/add_story">{Homepage.ADD_BUTTON}</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage2;
