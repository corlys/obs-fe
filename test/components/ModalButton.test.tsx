import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalButton from "../../src/components/ModalButton";
import "@testing-library/jest-dom";

describe("ModalButton", () => {
  const mockProps = {
    buttonTitle: "Open Modal",
    dialogTitle: "Modal Title",
    dialogDescription: "Modal Description",
    children: ({ close }: { close: () => void }) => (
      <div>
        <p>Modal Content</p>
        <button id="close-children" onClick={close}>
          Close
        </button>
      </div>
    ),
  };

  it("renders the button with correct title", () => {
    render(<ModalButton {...mockProps} />);
    expect(
      screen.getByRole("button", { name: "Open Modal" }),
    ).toBeInTheDocument();
  });

  it("opens the modal when button is clicked", async () => {
    render(<ModalButton {...mockProps} />);

    const button = screen.getByRole("button", { name: "Open Modal" });
    await userEvent.click(button);

    const modalTitleDiv = await screen.findByText("Modal Title");
    expect(modalTitleDiv).toBeInTheDocument();
  });

  it("renders modal content correctly", async () => {
    render(<ModalButton {...mockProps} />);
    const button = screen.getByRole("button", { name: "Open Modal" });
    await userEvent.click(button);

    const modalTitleDiv = screen.getByText("Modal Title");
    expect(modalTitleDiv).toBeInTheDocument();

    const modalDescriptionDiv = screen.getByText("Modal Description");
    expect(modalDescriptionDiv).toBeInTheDocument();

    expect(screen.getAllByRole("button", { name: "Close" }).length).to.be.eq(2);
  });

  it("closes the dialog when close button is clicked", async () => {
    render(<ModalButton {...mockProps} />);
    const openButton = screen.getByRole("button", { name: "Open Modal" });
    await userEvent.click(openButton);

    const [closeButton] = screen.getAllByRole("button", { name: "Close" });
    await userEvent.click(closeButton);

    const modalTitleDiv = screen.queryByText("Modal Title");

    expect(modalTitleDiv).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<ModalButton {...mockProps} className="custom-class" />);
    const container = screen.getByRole("button", {
      name: "Open Modal",
    }).parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("renders children with close function", async () => {
    const mockChildren = vi.fn(({ close }) => (
      <button onClick={close} id="close-children">
        Close Modal
      </button>
    ));
    render(<ModalButton {...mockProps} children={mockChildren} />);

    const openButton = screen.getByRole("button", { name: "Open Modal" });
    await userEvent.click(openButton);

    expect(mockChildren).toHaveBeenCalledWith(
      expect.objectContaining({
        close: expect.any(Function),
      }),
    );
  });
});
