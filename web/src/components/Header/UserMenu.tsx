import { useRef } from "react";
import { ConnectedProps, connect } from "react-redux";
import { XIcon } from "lucide-react";

import { logout } from "@/components/Auth/Auth.reducers";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { RootState } from "@/store/store";

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
            <div className="h-full flex flex-col py-6 border-l rounded-l-xl bg-white">
              <div className="flex items-center justify-between px-8">
                <div className="flex items-center mr-5">
                  <div className="mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-stone-200 border">
                      <img src={user?.avatarUrl} alt="User Avatar" className="w-full h-full rounded-full" />
                    </div>
                  </div>
                  <div className="mr-2">
                    <span className="text-md font-medium text-black" data-testid="UserMenu_username_span">
                      {user?.username}
                    </span>
                    <span className="font-medium block text-sm text-dark-surface-500" data-testid="UserMenu_email_span">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <button
                  className="text-dark-surface-500 p-2 rounded-md hover:bg-gray-200 transition-all duration-300"
                  type="button"
                  onClick={onClose}
                  data-testid="UserMenu_close_button"
                >
                  <span className="sr-only">Close</span>
                  <XIcon />
                </button>
              </div>
              <div className="mt-4 px-8 h-full overflow-auto text-sm text-black">
                <button
                  className="flex items-center p-2 my-2 rounded-md w-full hover:bg-gray-200 transition-all duration-300"
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

export const UserMenu = connector(_UserMenu);
