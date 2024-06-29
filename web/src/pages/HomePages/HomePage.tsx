import React, { memo } from "react";

import { Home } from "@/components/Home/Home";
import { PageLayout } from "@/pages/layouts/PageLayout";

const _HomePage: React.FC = () => {
  return (
    <PageLayout>
      <Home />
    </PageLayout>
  );
};

export const HomePage = memo(_HomePage);
