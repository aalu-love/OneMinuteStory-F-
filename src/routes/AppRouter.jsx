// import { BrowserRouter as Router } from 'react-router-dom';
// import { Switch, Route } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import HomePage2 from "../components/homepage2/homepage2";
import StoryFeed from "../pages/StoryFeed";
import ViewTile from "../pages/ViewTile";
import AddStory from "../pages/AddStory";
import Contact from "../pages/Contact/Contact";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import Profile from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute";

function AppRouter() {
    return (
        <Routes>
            {/* <Switch> */}
            <Route exact path="/" element={<HomePage2 />} />
            <Route path="/story_details" element={<StoryFeed />} />
            <Route path="/view_stories" element={<ViewTile />} />
            <Route path="/add_story" element={<AddStory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
            {/* Additional routes */}
            {/* </Switch> */}
        </Routes>
    );
}

export default AppRouter;
