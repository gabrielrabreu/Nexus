import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/Button/Button";
import { Grid } from "@/components/Grid/Grid";
import { FormField } from "@/components/FormField/FormField";
import { Input } from "@/components/Input/Input";
import { Typography } from "@/components/Typography/Typography";
import useOutsideClick from "@/hooks/useOutsideClick";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ISku) => Promise<void>;
  initialValue?: ISku | null;
}

const AddOrEditSkuModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialValue }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ISkuForm>({
    mode: "onBlur",
    defaultValues: {
      code: "",
      name: "",
      price: 0,
      stock: 0,
    },
  });

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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-md" ref={ref}>
            <Typography variant="heading">{initialValue ? "Edit Sku" : "Add Sku"}</Typography>
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormField
                name="code"
                label="Code"
                control={control}
                rules={{ required: "Code is required" }}
                error={errors.code}
                render={({ value, onChange, onBlur }) => (
                  <Input type="text" value={value} onChange={onChange} onBlur={onBlur} />
                )}
              />
              <FormField
                name="name"
                label="Name"
                control={control}
                rules={{ required: "Name is required" }}
                error={errors.name}
                render={({ value, onChange, onBlur }) => (
                  <Input type="text" value={value} onChange={onChange} onBlur={onBlur} />
                )}
              />
              <FormField
                name="price"
                label="Price"
                control={control}
                rules={{ required: "Price is required" }}
                error={errors.price}
                render={({ value, onChange, onBlur }) => (
                  <Input type="number" value={value} onChange={onChange} onBlur={onBlur} />
                )}
              />
              <FormField
                name="stock"
                label="Stock"
                control={control}
                rules={{ required: "Stock is required" }}
                error={errors.stock}
                render={({ value, onChange, onBlur }) => (
                  <Input type="number" value={value} onChange={onChange} onBlur={onBlur} />
                )}
              />
              <Grid cols={2}>
                <Button type="submit" text="Submit" />
                <Button type="button" text="Close" onClick={handleClose} />
              </Grid>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export { AddOrEditSkuModal };
