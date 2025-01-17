import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OMS from '../../assets/OMS.png';

import "./header.scss";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUser = useSelector(
        (state) => state?.oneMinuteStory?.currentUser?.data
    );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // document.body.style.overflow = 'hidden';
    };

    return (
        <section id="header-jsx">
            <div className="main-container">
                <div className="title-container">
                    <Link
                        to="/"
                        // className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mx-6"
                    >
                        <img src={OMS} alt="" />
                        {/* One Minute Story */}
                    </Link>
                </div>

                {/* Hamburger icon for mobile */}
                <div className="hamburger lg:hidden cursor-pointer" onClick={toggleMenu}>
                    <svg
                        className="w-6 h-6 text-white mx-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </div>

                {/* Navigation links for desktop */}
                <div className="link-container-pc">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link to="/view_stories">View Stories</Link>
                        </li>
                        <li>
                            <Link to="/add_story">Add Story</Link>
                        </li>
                        <li>
                            <Link
                                to={
                                    currentUser?.email ? "/profile" : "/sign-in"
                                }
                            >
                                {currentUser?.email ? (
                                    <img
                                        src={currentUser.profilePicture}
                                        alt="profile"
                                        // className="h-7 w-7 rounded-full object-cover"
                                    />
                                ) : (
                                    <li>Sign In</li>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Navigation links for mobile with semi-transparent and blurred background */}
                {isMenuOpen && (
                    <div className="link-container-mobile">
                        <ul
                        // className="lg:hidden flex flex-col gap-4 text-black absolute top-20 left-0 right-0 min-h-screen backdrop-filter backdrop-blur-md bg-blue-100 bg-opacity-30 border border-white-500 rounded-md p-4"
                        >
                            <li>
                                <Link
                                    to="/"
                                    onClick={toggleMenu}
                                    // className="text-lg hover:text-blue-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    onClick={toggleMenu}
                                    // className="text-lg hover:text-blue-300"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/view_stories"
                                    onClick={toggleMenu}
                                    // className="text-lg hover:text-blue-300"
                                >
                                    View Stories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/add_story"
                                    onClick={toggleMenu}
                                    // className="text-lg hover:text-blue-300"
                                >
                                    Add Story
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to={
                                        currentUser?.email
                                            ? "/profile"
                                            : "/sign-in"
                                    }
                                >
                                    {currentUser ? (
                                        <img
                                            src={currentUser.profilePicture}
                                            alt="profile"
                                            // className="h-7 w-7 rounded-full object-cover"
                                            onClick={toggleMenu}
                                        />
                                    ) : (
                                        <li>Sign In</li>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Header;