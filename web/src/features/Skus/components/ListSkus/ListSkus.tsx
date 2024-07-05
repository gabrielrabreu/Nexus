import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PencilIcon, PlusIcon } from "lucide-react";

import { addSku, editSku, listSkus } from "@/api/skus.api";

import { AddOrEditSkuModal } from "../AddOrEditSkuModal/AddOrEditSkuModal";

const _ListSkus = () => {
  const [skus, setSkus] = useState<ISku[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 5;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingSku, setEditingSku] = useState<ISku | null>(null);

  const fetchSkus = useCallback(async () => {
    await listSkus(pageNumber, pageSize)
      .then((response) => {
        setSkus(response.items);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalCount);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchSkus();
  }, [fetchSkus]);

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setPageNumber(page);
  };

  const handleModalAddSku = (): void => {
    setShowModal(true);
  };

  const handleModalEditSku = (sku: ISku): void => {
    setEditingSku(sku);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingSku(null);
  };

  const handleModalFormSubmit = async (sku: ISku) => {
    if (editingSku) {
      await editSku(editingSku.id, sku)
        .then(() => {
          toast.success("Sku updated successfully");
          handleModalClose();
          fetchSkus();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      await addSku(sku)
        .then(() => {
          toast.success("Sku added successfully");
          handleModalClose();
          fetchSkus();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const resultsStart = (pageNumber - 1) * pageSize + 1;
  const resultsEnd = Math.min(pageNumber * pageSize, totalItems);

  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold py-4" data-testid="ListSkus_title">
          List Skus
        </h1>
        <button
          className="p-2 text-gray-500 rounded-lg hover:bg-gray-200 transition-all duration-300"
          onClick={handleModalAddSku}
        >
          <PlusIcon size={15} />
        </button>
      </div>
      <div className="mt-2">
        {skus.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="p-2 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Code
                        </th>
                        <th scope="col" className="p-2 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Name
                        </th>
                        <th scope="col" className="p-2 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Price
                        </th>
                        <th scope="col" className="p-2 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Stock
                        </th>
                        <th scope="col" className="relative p-2 hidden md:flex">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {skus.map((sku) => (
                        <tr key={sku.id} className="hover:bg-gray-50 transition-all duration-300">
                          <td className="p-2 text-sm whitespace-nowrap">{sku.code}</td>
                          <td className="p-2 text-sm whitespace-nowrap">{sku.name}</td>
                          <td className="p-2 text-sm whitespace-nowrap">{sku.price}</td>
                          <td className="p-2 text-sm whitespace-nowrap">{sku.stock}</td>
                          <td className="p-2 text-sm whitespace-nowrap float-right hidden md:flex">
                            <button
                              className="p-2 text-gray-500 rounded-lg hover:bg-gray-200 transition-all duration-300"
                              onClick={() => handleModalEditSku(sku)}
                            >
                              <PencilIcon size={15} />
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
        {skus.length > 0 && (
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <p className="text-sm text-gray-500">
                Showing {resultsStart} to {resultsEnd} of {totalItems} results
              </p>
            </div>
            <div className="flex">
              <button
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
                className={`inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400  ${
                  pageNumber === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                &lt;
              </button>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, index) => {
                let displayPage = pageNumber - 1 + index;

                if (pageNumber <= 2) {
                  displayPage = index + 1;
                } else if (pageNumber >= totalPages - 1) {
                  displayPage = totalPages - 2 + index;
                }

                return (
                  <button
                    key={displayPage}
                    onClick={() => handlePageClick(displayPage)}
                    className={`-ml-px inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium ${
                      pageNumber === displayPage ? "text-gray-800 bg-gray-200" : "text-gray-500 hover:text-gray-400"
                    } focus:z-10 focus:outline-none focus:shadow-outline-blue`}
                  >
                    {displayPage}
                  </button>
                );
              })}
              <button
                onClick={handleNextPage}
                disabled={pageNumber === totalPages}
                className={`-ml-px inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 ${
                  pageNumber === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
      <AddOrEditSkuModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalFormSubmit}
        initialValue={editingSku}
      />
    </div>
  );
};

export const ListSkus = _ListSkus;
