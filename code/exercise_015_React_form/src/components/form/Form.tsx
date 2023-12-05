import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZodType } from "zod";

export type DirtyObject<T> = T extends object
  ? { [P in keyof T]-?: DirtyObject<T[P]> }
  : T | string;

interface Props<T> {
  onSubmit: (t: T) => void;
  validation?: ZodType<T>;
  defaultValue: DirtyObject<T>;
}

export function Form<T extends object>({
  validation,
  onSubmit,
  defaultValue,
  children,
}: PropsWithChildren<Props<T>>) {
  const methods = useForm<DirtyObject<T>, void, T>({
    // @ts-expect-error DefaultValues<T> = T should work
    defaultValues: defaultValue,
    resolver: validation ? zodResolver(validation) : undefined,
  });
  // @ts-expect-error handleSubmit should accept T => void
  const handleSubmit = methods.handleSubmit((t) => onSubmit(t));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
}
