import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Hero/connect_together.png";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div className="shadow-md shadow-indigo-600/60">
      <div
        className={`flex  h-14 items-center justify-center overflow-hidden ${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" width={180} height={40} loading="lazy" className="navbarLogo" />
          </Link>

          {/* Navigation links for Desktop */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {(link.display === 1 || user?.role === "Student") && (
                    <Link to={link?.path} className="relative group">
                      <p
                        className={`${
                          matchRoute(link?.path) ? "text-indigo-800 font-bold" : "text-black"
                        } transition-all duration-300`}
                      >
                        {link.title}
                      </p>
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] w-full bg-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                      ></span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Login / Signup / Profile */}
          <div className="hidden md:flex items-center gap-x-4">
            {token === null ? (
              <>
                <Link to="/login">
                  <button className="rounded-[8px] border border-richblack-700 bg-indigo-400 px-[12px] py-[8px] text-richblack-100 hover:bg-indigo-800 hover:text-white">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-[8px] border border-richblack-700 bg-indigo-400 px-[12px] py-[8px] text-richblack-100 hover:bg-indigo-800 hover:text-white">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mr-4 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <AiOutlineClose fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {console.log(mobileMenuOpen)}
      {
      mobileMenuOpen && (
        <div className="md:hidden z-50 absolute bg-indigo-200 top-14 left-0 w-full bg-richblack-900 text-black py-4">
          <ul className="flex flex-col gap-y-2 text-center">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {(link.display === 1 || user?.role === "Student") && (
                  <Link
                    to={link?.path}
                    className="block py-2 text-lg hover:text-indigo-400 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)} // Close menu on link click
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center mt-4">
            {token === null ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="mb-2 rounded-[8px] border border-richblack-700 bg-indigo-400 px-[12px] py-[8px] text-white w-40 hover:bg-indigo-800 hover:text-white">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="rounded-[8px] border border-richblack-700 bg-indigo-400 px-[12px] py-[8px] text-white w-40 hover:bg-indigo-800 hover:text-white">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>
      )
      }
    </div>
  );
}

export default Navbar;
