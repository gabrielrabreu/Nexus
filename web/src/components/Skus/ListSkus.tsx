import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { EllipsisVerticalIcon, PlusIcon } from "lucide-react";

import { RootState } from "@/store/store";

import { AddOrEditSkuModal } from "./AddOrEditSkuModal/AddOrEditSkuModal";
import { add, update, fetchAll } from "./Skus.thunks";
import { Loading } from "@/components/Loading/Loading";

const mapStateToProps = (state: RootState) => ({
  skus: state.skusReducer.skus,
  loading: state.skusReducer.loading,
});

const mapDispatchToProps = {
  add,
  update,
  fetchAll,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

const _ListSkus: React.FC<Props> = ({ skus, loading, add, update, fetchAll }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingSku, setEditingSku] = useState<ISku | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleAdd = (): void => {
    setShowModal(true);
  };

  const handleEdit = (sku: ISku): void => {
    setEditingSku(sku);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingSku(null);
  };

  const handleFormSubmit = async (sku: ISku) => {
    if (editingSku) {
      await update({ id: editingSku.id, data: sku }).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          handleModalClose();
        }
      });
    } else {
      await add(sku).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          handleModalClose();
        }
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="text-black dark:text-white">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold py-4" data-testid="ListSkus_title">
          List Skus
        </h1>
        <PlusIcon onClick={handleAdd} className="cursor-pointer" />
      </div>
      <div className="mt-2">
        {skus.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-dark-mixed-300 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-mixed-300">
                    <thead className="bg-gray-50 dark:bg-dark-mixed-200">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Id
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Code
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Stock
                        </th>
                        <th scope="col" className="relative py-3.5 px-4 hidden md:flex">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-dark-mixed-300 dark:bg-dark-mixed-100">
                      {skus.map((sku) => (
                        <tr key={sku.id}>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">{sku.id}</td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">{sku.code}</td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">{sku.name}</td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">{sku.price}</td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">{sku.stock}</td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap float-right hidden md:flex">
                            <button className="px-1 py-1 text-gray-500 rounded-lg dark:text-gray-300">
                              <EllipsisVerticalIcon onClick={() => handleEdit(sku)} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AddOrEditSkuModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        initialValue={editingSku}
      />
    </div>
  );
};

const ListSkus = connector(_ListSkus);

export { ListSkus };
