import { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";

import { logout, loadFromStorage } from "@/components/Auth/Auth.reducers";
import { Router } from "@/routes";
import { RootState } from "@/store/store";
import { Loading } from "@/components/Loading/Loading";

const mapStateToProps = (state: RootState) => ({
  isLoading: state.authReducer.loading,
});

const mapDispatchToProps = {
  loadFromStorage,
  logout,
};
const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

const _App: React.FC<Props> = ({ loadFromStorage, logout, isLoading }) => {
  useEffect(() => {
    if (localStorage.user) {
      loadFromStorage();
    }

    window.addEventListener("storage", () => {
      if (!localStorage.user) logout();
    });
  }, [loadFromStorage, logout]);

  if (isLoading) {
    return <Loading />;
  }

  return <Router />;
};

const App = connector(_App);

export default App;
