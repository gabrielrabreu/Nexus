import React from "react";

import { PageLayout } from "@/pages/layouts/PageLayout";
import { ListSkus } from "@/components/Skus/ListSkus";

const _ListSkusPage: React.FC = () => {
  return (
    <PageLayout>
      <ListSkus />
    </PageLayout>
  );
};

const ListSkusPage = React.memo(_ListSkusPage);

export default ListSkusPage;
