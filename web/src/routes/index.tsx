import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Loading } from "@/components/Loading/Loading";
import { PATH } from "@/constants/paths";
import { MainLayout } from "@/pages/layouts/MainLayout";
import { HomePage } from "@/pages/HomePages/HomePage";
import { LoginPage } from "@/pages/AuthPages/LoginPage";
import { ListSkusPage } from "@/pages/SkuPages/ListSkusPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={PATH.HOME} element={<HomePage />} />
            <Route path={PATH.LIST_SKUS} element={<ListSkusPage />} />
          </Route>
          <Route path={PATH.LOGIN} element={<LoginPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
