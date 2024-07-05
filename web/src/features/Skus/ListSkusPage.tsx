import React, { memo } from "react";

import { PageLayout } from "@/layouts/PageLayout";

import { ListSkus } from "./components/ListSkus/ListSkus";

const _ListSkusPage: React.FC = () => {
  return (
    <PageLayout>
      <ListSkus />
    </PageLayout>
  );
};

export const ListSkusPage = memo(_ListSkusPage);
