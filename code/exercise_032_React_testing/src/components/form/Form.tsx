import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { ZodType } from "zod";

interface Props<T, R> {
  onSubmit: (t: T) => R | Promise<R>;
  validation?: ZodType<T>;
  defaultValue?: DefaultValues<T>;
}

export function Form<T extends object, R>({
  validation,
  onSubmit,
  defaultValue,
  children,
}: PropsWithChildren<Props<T, R>>) {
  const methods = useForm<T>({
    defaultValues: defaultValue,
    resolver: validation ? zodResolver(validation) : undefined,
  });

  const handleSubmit = methods.handleSubmit((t) => onSubmit(t));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
}
