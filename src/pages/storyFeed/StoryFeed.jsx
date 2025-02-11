import { useState } from "react";
import { useSelector } from "react-redux";
import AddStory from "../addStory/AddStory";
import {
  generateStoryData,
  getStoryData,
  setStoryData,
} from "../../store/action";
import { useDispatch } from "react-redux";

import "./storyFeed.scss";
import { Button, Switch } from "antd";

function StoryFeed() {
  const dispatch = useDispatch();
  const [generatedStory, setGeneratedStory] = useState("");
  const [generatedStoryDataAdded, setGeneratedStoryDataAdded] = useState(false);
  const [disabledGenerateButton, setDisabledGenerateButton] = useState(false);

  const [paraOption, setOption] = useState(true);
  const titleId = useSelector((state) => state?.oneMinuteStory?.titleId);
  const storyData = useSelector((state) => state?.oneMinuteStory?.storyData);
  const generatedStoryData = useSelector((state) => state?.oneMinuteStory);
  const currentUser = useSelector(
    (state) => state?.oneMinuteStory?.currentUser?.data
  );

  const specificStory = storyData?.find((item) => item?._id === titleId);

  const optionRender = (story) => {
    if (paraOption) {
      return (
        <div className="storyFeed-paragraph">
          {story?.map((item) => item.content).join(" ")}
        </div>
      );
    } else {
      return story.map((story) => (
        <div key={story._id}>&nbsp;{story.content} </div>
      ));
    }
  };

  const handleAddGeneratedStory = () => {
    const data = {
      title: specificStory.title,
      story: [
        {
          content: generatedStory,
        },
      ],
      writerName: currentUser?.username,
      // email: currentUser.email,
    };
    dispatch(
      setStoryData(
        data?.title,
        data?.story,
        currentUser?.email,
        currentUser?.username
      )
    );
    setGeneratedStoryDataAdded(true);
    setTimeout(() => {
      dispatch(getStoryData());
    }, 500);
  };

  const handleGenerateStory = async () => {
    try {
      const combinedStory = specificStory.story
        .map((item) => item.content)
        .join(" ");

      //TODO: send combinedStory to the backend

      // await dispatch(generateStoryData(specificStory.story));
      await dispatch(generateStoryData(combinedStory));
      setDisabledGenerateButton(true);
      // console.log(
      //   "RESULT ACTION",
      //   generatedStoryData.generatedStory.data.generatedStoryData
      // );
      setGeneratedStory(
        generatedStoryData.generatedStory.data.generatedStoryData
      );
      setGeneratedStoryDataAdded(false);
      setTimeout(() => {
        setDisabledGenerateButton(false);
      }, 5000);
    } catch (error) {
      setGeneratedStory(
        "Sorry, we could not generate a story for you. Please try again later."
      );
      console.error("Error generating story:", error);
    }
  };

  return (
    <section id="storyFeed-jsx">
      <div>
        {specificStory ? (
          <div className="main-container">
            <div className="title-container">
              <label htmlFor=""> Title:&nbsp;</label>
              {specificStory.title.toUpperCase()}
            </div>
            <span className="para-switch-container">
              {paraOption ? "Paragraph" : "Block"} :
              <Switch
                className="para-switch"
                onChange={(prev) => setOption(!prev)}
              />
            </span>
            <div className="story-container">
              {optionRender(specificStory.story)}
            </div>
            <div>
              <div
                className={
                  disabledGenerateButton
                    ? "disabled-button-container"
                    : "button-container"
                }
              >
                <Button
                  disabled={disabledGenerateButton}
                  onClick={handleGenerateStory}
                  title={
                    disabledGenerateButton ? "Please wait for 5 seconds" : undefined
                  }
                >
                  AUTO GENERATE
                </Button>
              </div>
              {generatedStory ? (
                // <div>{generatedStory}</div>
                <div>
                  <div className="generatedStory-container">
                    {generatedStory}
                  </div>
                  <div
                    className={
                      generatedStoryDataAdded
                        ? "disabled-button-container"
                        : "button-container"
                    }
                  >
                    <Button
                      onClick={handleAddGeneratedStory}
                      disabled={generatedStoryDataAdded}
                      title={
                        generatedStoryDataAdded
                          ? "Story already added"
                          : "Add story"
                      }
                    >
                      Loved what&#39;s generated ! <br></br> Click here to add
                      it
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="generatedStory-container">
                  {" "}
                  GENERATED STORY WILL SHOW HERE
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>No story found</div>
        )}

        <AddStory titleData={specificStory.title} />
      </div>
    </section>
  );
}

export default StoryFeed;
