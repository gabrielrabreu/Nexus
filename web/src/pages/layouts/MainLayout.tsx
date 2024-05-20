import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";

import { Header } from "@/components/Header/Header";
import { PATH } from "@/constants/paths";
import { RootState } from "@/store/store";

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

const connector = connect(mapStateToProps);

interface Props extends ConnectedProps<typeof connector> {}

const _MainLayout: React.FC<Props> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const MainLayout = connector(_MainLayout);

export default MainLayout;
