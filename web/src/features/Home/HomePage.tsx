import React, { memo } from "react";

import { PageLayout } from "@/layouts/PageLayout";

const _HomePage: React.FC = () => {
  return (
    <PageLayout>
      <div>
        <h1 className="font-semibold py-4" data-testid="Home_title">
          Home
        </h1>
      </div>
    </PageLayout>
  );
};

export const HomePage = memo(_HomePage);
