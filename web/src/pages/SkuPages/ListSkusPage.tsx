import React, { memo } from "react";

import { ListSkus } from "@/components/Skus/ListSkus";
import { PageLayout } from "@/pages/layouts/PageLayout";

const _ListSkusPage: React.FC = () => {
  return (
    <PageLayout>
      <ListSkus />
    </PageLayout>
  );
};

export const ListSkusPage = memo(_ListSkusPage);
