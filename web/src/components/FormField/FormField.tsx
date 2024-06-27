import { ChangeEvent } from "react";
import { Controller, Control, FieldError, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  rules?: object;
  error?: FieldError;
  render: (field: {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    value: TFieldValues[Path<TFieldValues>];
    name: string;
    ref: (instance: TFieldValues) => void;
  }) => JSX.Element;
}

const _FormField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  rules,
  error,
  render,
}: FormFieldProps<TFieldValues>) => {
  return (
    <div className="my-2">
      <label className="text-xs text-gray-800" htmlFor={name}>
        <p>{label}</p>
      </label>
      <Controller control={control} name={name} rules={rules} render={({ field }) => render(field)} />
      {error?.message && (
        <div className="mt-0.5 text-xs text-red-500">
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

const FormField = _FormField;

export { FormField };
