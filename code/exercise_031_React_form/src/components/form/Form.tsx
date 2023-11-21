import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { ZodType } from "zod";

interface Props<T, R> {
  validation: ZodType<T>;
  onSubmit: (t: T) => R | Promise<R>;
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
    resolver: zodResolver(validation),
  });

  const handleSubmit = methods.handleSubmit((t) => Promise.resolve(onSubmit(t)));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
}
