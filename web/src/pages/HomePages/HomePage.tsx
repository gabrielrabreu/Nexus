import React from "react";

import { Home } from "@/components/Home/Home";
import { PageLayout } from "@/pages/layouts/PageLayout";

const _HomePage: React.FC = () => {
  return (
    <PageLayout>
      <Home />
    </PageLayout>
  );
};

const HomePage = React.memo(_HomePage);

export default HomePage;
