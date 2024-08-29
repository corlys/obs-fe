import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UserDetails from "../../src/components/UserDetails";

import "@testing-library/jest-dom";

vi.mock("../../src/components/ui/avatar", () => ({
  Avatar: ({ children, ...props }) => (
    <div data-testid="avatar" {...props}>
      {children}
    </div>
  ),
  AvatarImage: ({ src, alt, ...props }) => (
    <img data-testid="avatar-image" src={src} alt={alt} {...props} />
  ),
  AvatarFallback: ({ children, ...props }) => (
    <span data-testid="avatar-fallback" {...props}>
      {children}
    </span>
  ),
}));

describe("UserDetails", () => {
  const mockProps = {
    id: 1,
    name: "Suparman",
    username: "suparmannn",
    email: "suparman@suppp.com",
    onClose: vi.fn(),
  };

  it("renders user details correctly", () => {
    render(<UserDetails {...mockProps} />);

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Suparman")).toBeInTheDocument();
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("suparmannn")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("suparman@suppp.com")).toBeInTheDocument();
  });

  it("displays the avatar", async () => {
    render(<UserDetails {...mockProps} />);

    expect(screen.getByTestId("avatar")).toBeInTheDocument();

    expect(screen.getByTestId("avatar-fallback")).toBeInTheDocument();
    expect(screen.getByText("AV")).toBeInTheDocument();

    const avatarImage = screen.getByTestId("avatar-image");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute("src", "https://picsum.photos/200");
    expect(avatarImage).toHaveAttribute("alt", "@corlys");
  });

  it("calls onClose when the close button is clicked", () => {
    render(<UserDetails {...mockProps} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });
});
