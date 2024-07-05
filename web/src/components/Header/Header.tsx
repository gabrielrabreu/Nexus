import { useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { UserMenu } from "@/components/UserMenu/UserMenu";
import { PATH } from "@/constants/paths";
import { RootState } from "@/store/store";

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

const _Header: React.FC<Props> = ({ user }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prevIsMenuVisible) => !prevIsMenuVisible);
  };

  return (
    <header
      className="md:sticky lg:top-0 flex flex-wrap bg-white border-stone-200 border-b border-solid"
      data-testid="Header"
    >
      <div className="mx-auto w-11/12 rounded-xl">
        <div className="flex items-stretch justify-between grow py-3">
          <div className="flex items-center gap-2">
            <div className="flex relative items-center ml-2">
              <button className="flex items-center justify-center w-12 h-12 rounded-full pointer-events-none border-stone-200 border">
                <img src="logo.png" alt="Logo" className="w-full h-full rounded-full" data-testid="Header_logo_img" />
              </button>
            </div>
            <nav className="flex relative items-center ml-2">
              <NavLink to={PATH.HOME} className="font-semibold text-dark" data-testid="Header_home_link">
                Home
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex relative items-center">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full border-stone-200 border"
                onClick={toggleMenuVisibility}
                data-testid="Header_userAvatar_button"
              >
                <img src={user?.avatarUrl} alt="User Avatar" className="w-full h-full rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserMenu isVisible={isMenuVisible} onClose={toggleMenuVisibility} />
    </header>
  );
};

export const Header = connector(_Header);
