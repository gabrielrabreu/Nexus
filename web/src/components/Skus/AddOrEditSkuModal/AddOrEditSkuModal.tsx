import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import useOutsideClick from "@/hooks/useOutsideClick";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ISku) => Promise<void>;
  initialValue?: ISku | null;
}

const AddOrEditSkuModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialValue }) => {
  const { register, handleSubmit, reset, setValue } = useForm<ISkuForm>({
    mode: "onBlur",
  });

  const rules = {
    code: { required: "Code is required" },
    name: { required: "Name is required" },
    price: { required: "Price is required" },
    stock: { required: "Stock is required" },
  };

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    handleClose();
  });

  useEffect(() => {
    if (initialValue) {
      setValue("code", initialValue.code);
      setValue("name", initialValue.name);
      setValue("price", initialValue.price);
      setValue("stock", initialValue.stock);
    } else {
      reset();
    }
  }, [initialValue, reset, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const submitHandler: SubmitHandler<ISkuForm> = async (values: ISkuForm) => {
    await onSubmit(values as ISku);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center bg-dark-mixed-300">
          <div
            className="bg-gray-50 dark:bg-dark-mixed-100 text-black p-5 border rounded-xl shadow-md dark:border-dark-mixed-300"
            ref={ref}
          >
            <h1 className="font-semibold text-black dark:text-white ">{initialValue ? "Edit Sku" : "Add Sku"}</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="mt-2 content-center">
                <label
                  className="
                    text-xs tracking-wide
                    text-gray-700 dark:text-white"
                  htmlFor="code"
                >
                  Code
                </label>
                <input
                  className="
                    w-full content-center text-base px-4 py-2 rounded-md bg-gray-50
                    border-gray-300 focus:border-dark-primary-500 border-b focus:outline-none"
                  id="code"
                  type="text"
                  placeholder="SKU001"
                  {...register("code", rules.code)}
                />
              </div>
              <div className="mt-1 content-center">
                <label
                  className="
                    text-xs tracking-wide
                    text-gray-700 dark:text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="
                    w-full content-center text-base px-4 py-2 rounded-md bg-gray-50
                    border-gray-300 focus:border-dark-primary-500 border-b focus:outline-none"
                  id="name"
                  type="text"
                  placeholder="Product A"
                  {...register("name", rules.name)}
                />
              </div>
              <div className="mt-1 content-center">
                <label
                  className="
                    text-xs tracking-wide
                    text-gray-700 dark:text-white"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="
                    w-full content-center text-base px-4 py-2 rounded-md bg-gray-50
                    border-gray-300 focus:border-dark-primary-500 border-b focus:outline-none"
                  id="price"
                  type="number"
                  placeholder="29.99"
                  step="0.01"
                  min="0"
                  {...register("price", rules.price)}
                />
              </div>
              <div className="mt-1 content-center">
                <label
                  className="
                    text-xs tracking-wide
                    text-gray-700 dark:text-white"
                  htmlFor="stock"
                >
                  Stock
                </label>
                <input
                  className="
                    w-full content-center text-base px-4 py-2 rounded-md bg-gray-50
                    border-gray-300 focus:border-dark-primary-500 border-b focus:outline-none"
                  id="stock"
                  type="number"
                  placeholder="150"
                  step="1"
                  min="0"
                  {...register("stock", rules.stock)}
                />
              </div>
              <div className="grid gap-2 mt-2 grid-cols-3">
                <button
                  className="
                    cursor-pointer hover:bg-dark-mixed-300 p-2
                    text-white bg-dark-mixed-200 rounded-md"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="
                    col-start-3
                    cursor-pointer hover:bg-dark-mixed-300 p-2
                    text-white bg-dark-mixed-200 rounded-md"
                  type="button"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export { AddOrEditSkuModal };
