import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStoryData } from "../../store/action";
import { NavLink } from "react-router-dom";
import OpenAI from "openai";

import "./homepage.scss";

function HomePage2() {
  const dispatch = useDispatch();

  // const openai = new OpenAI({
  //   baseURL: "https://api.deepseek.com",
  //   dangerouslyAllowBrowser: true
  // });

  // async function deepseekcheck() {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: "You are a helpful assistant." }],
  //     model: "deepseek-chat",
  //   });

  //   console.log(completion.choices[0].message.content);
  // }

  // deepseekcheck();

  useEffect(() => {
    dispatch(getStoryData());
  }, []);

  return (
    <section id="homepage-jsx">
      <div className="main-container">
        <div className="container">
          {/* <p className="warning-container">
                        * This app is still in production, but you can still use
                        demo version of this app.
                    </p> */}
          <p className="title">One Minute Story</p>
          <p className="description">
            Ignite creativity in 60 seconds! Choose a title, feel the rush, and
            craft captivating tales against the clock. Join a vibrant community
            of storytellers for an exhilarating journey.
          </p>
          <div className="button-container">
            <Button>
              <NavLink to="/view_stories">View Stories</NavLink>
            </Button>
            <Button>
              <NavLink to="/add_story">Add Story</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage2;
