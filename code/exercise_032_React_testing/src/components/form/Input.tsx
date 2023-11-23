import { FC } from "react";

import { Controller, useFormContext } from "react-hook-form";

import TextField, { TextFieldProps } from "@mui/material/TextField";

type Props = TextFieldProps & Required<Pick<TextFieldProps, "name">>;

export const Input: FC<Props> = ({ name, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          inputRef={ref}
          {...field}
          {...props}
        />
      )}
    />
  );
};
