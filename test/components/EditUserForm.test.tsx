import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditUserForm from "../../src/components/EditUserForm";

import "@testing-library/jest-dom";

describe("EditUserForm", () => {
  const mockProps = {
    onClose: vi.fn(),
    submitFn: vi.fn(),
    id: 1,
    name: "",
    username: "",
    email: "",
  };

  beforeEach(() => {
    render(<EditUserForm {...mockProps} />);
  });

  it("renders fields correctly", () => {
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
      expect(mockProps.submitFn).toHaveBeenCalledWith(mockProps.id, {
        username: "mootjeman00",
        email: "mootjeman@sapi.com",
        name: "mootjeman",
      });
    });
  });

  it("have error when the fields not properly filled when submitted (at least one field is submitted)", async () => {
    const user = userEvent.setup();

    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "mootjeman@sapi.com",
    );

    await user.type(
      screen.getByRole("textbox", { name: "Username" }),
      "mootjeman00",
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    const nameOrUsernameErrors = await screen.findAllByText(/String must/i);
    screen.debug(nameOrUsernameErrors);
    expect(nameOrUsernameErrors.length).to.be.eq(1);
  });
});
