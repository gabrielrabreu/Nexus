import { useRef } from "react";
import { ConnectedProps, connect } from "react-redux";
import { XIcon } from "lucide-react";

import { logout } from "@/components/Auth/Auth.reducers";
import { RootState } from "@/store/store";

import useOutsideClick from "./useOutsideClick";

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
});

const mapDispatchToProps = {
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {
  isVisible: boolean;
  onClose: () => void;
}

const _UserMenu: React.FC<Props> = ({ isVisible, onClose, user, logout }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    onClose();
  });

  return (
    isVisible && (
      <div className="fixed inset-0 z-50 overflow-hidden" data-testid="UserMenu">
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex ">
          <div className="w-screen max-w-sm z-50" ref={ref}>
            <div
              className="
                h-full flex flex-col py-6 border-l rounded-l-xl
                bg-white
                dark:bg-dark-mixed-200  dark:border-dark-mixed-300"
            >
              <div className="flex items-center justify-between px-8">
                <div className="flex items-center mr-5">
                  <div className="mr-5">
                    <div
                      className="
                        flex items-center justify-center w-12 h-12 rounded-full 
                        border-stone-200 border 
                        dark:border-dark-mixed-300"
                    >
                      <img src={user?.avatarUrl} alt="User Avatar" className="w-full h-full rounded-full" />
                    </div>
                  </div>
                  <div className="mr-2 ">
                    <span
                      className="
                        text-md font-medium 
                        text-black
                        dark:text-white"
                      data-testid="UserMenu_username_span"
                    >
                      {user?.username}
                    </span>
                    <span
                      className="
                        font-medium block text-sm 
                        text-dark-surface-500"
                      data-testid="UserMenu_email_span"
                    >
                      {user?.email}
                    </span>
                  </div>
                </div>
                <button
                  className="text-dark-surface-500"
                  type="button"
                  onClick={onClose}
                  data-testid="UserMenu_close_button"
                >
                  <span className="sr-only">Close</span>
                  <XIcon />
                </button>
              </div>
              <div
                className="
                  mt-4 px-8 h-full overflow-auto text-sm
                  text-black
                  dark:text-white"
              >
                <button
                  className="flex items-center px-2 py-2 my-2 rounded-md w-full"
                  type="button"
                  onClick={() => logout()}
                  data-testid="UserMenu_logout_button"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

const UserMenu = connector(_UserMenu);

export { UserMenu };
