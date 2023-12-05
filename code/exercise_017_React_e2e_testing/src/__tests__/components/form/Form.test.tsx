import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Input } from "~/components/form/Input";
import { Form } from "~/components/form/Form";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

describe("Form", () => {
  const submit = () => fireEvent.click(screen.getByRole("button"));
  const getByLabel = (label: string): HTMLInputElement =>
    screen.getByLabelText(label);

  it("renders input field with correct attributes", () => {
    render(
      <Form onSubmit={vi.fn} defaultValue={{ test: "" }}>
        <Input name="test" label="Test Input" />
      </Form>,
    );

    const inputElement = getByLabel("Test Input");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe("text");
  });

  it("renders input field with error message", async () => {
    render(
      <Form
        validation={z.object({ test: z.string().min(1) })}
        onSubmit={() => vi.fn()}
        defaultValue={{ test: "" }}
      >
        <Input name="test" label="Test Input" />
        <button type="submit" />
      </Form>,
    );

    const inputElement = getByLabel("Test Input");

    submit();

    await screen.findByText("String must contain at least 1 character(s)");

    expect(inputElement).toHaveAttribute("aria-invalid", "true");
  });

  it("renders input field without error message", async () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit} defaultValue={{ test: "" }}>
        <Input name="test" label="Test Input" />
        <button type="submit" />
      </Form>,
    );

    const inputElement = getByLabel("Test Input");
    fireEvent.change(inputElement, { target: { value: "Test value" } });

    submit();

    expect(screen.queryByText("This field is required")).toBeNull();
    expect(inputElement).toHaveAttribute("aria-invalid", "false");
    expect(inputElement).toHaveAttribute("value", "Test value");

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({ test: "Test value" }),
    );
  });

  it("renders input field with default values", () => {
    render(
      <Form onSubmit={vi.fn()} defaultValue={{ test: "Default value" }}>
        <Input name="test" label="Test Input" />
        <button type="submit" />
      </Form>,
    );

    const inputElement = getByLabel("Test Input");
    expect(inputElement).toHaveAttribute("value", "Default value");
  });
});
