import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CreateUserForm from "../../src/components/CreateUserForm";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

describe("Create User Form", () => {
  const props = {
    submitFn: vi.fn(),
    onClose: vi.fn(),
  };

  it("renders fields correctly", () => {
    render(<CreateUserForm {...props} />);

    expect(
      screen.getByRole("textbox", { name: "Full Name" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Username" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("have correct value when typed into", async () => {
    render(<CreateUserForm {...props} />);

    const user = userEvent.setup();
    await user.type(
      screen.getByRole("textbox", { name: "Full Name" }),
      "mootjeman",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Username" }),
      "mootjeman00",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "mootjeman@sapi.com",
    );

    expect(screen.getByRole("textbox", { name: "Full Name" })).toHaveValue(
      "mootjeman",
    );
    expect(screen.getByRole("textbox", { name: "Username" })).toHaveValue(
      "mootjeman00",
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveValue(
      "mootjeman@sapi.com",
    );
  });

  it("passing the correct value when submitted", async () => {
    render(<CreateUserForm {...props} />);

    const user = userEvent.setup();
    await user.type(
      screen.getByRole("textbox", { name: "Full Name" }),
      "mootjeman",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Username" }),
      "mootjeman00",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "mootjeman@sapi.com",
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(props.submitFn).toHaveBeenCalledWith({
        username: "mootjeman00",
        email: "mootjeman@sapi.com",
        name: "mootjeman",
      });
    });
  });

  it("have error when not properly filled when submitted", async () => {
    render(<CreateUserForm {...props} />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText(/Invalid Email/i)).toBeInTheDocument();
    const nameAndUsernameErrors = await screen.findAllByText(/String must/i);
    expect(nameAndUsernameErrors.length).to.be.eq(2);
  });
});
