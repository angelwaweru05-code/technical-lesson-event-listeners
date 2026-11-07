import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Question from "./Question";
import isValidAnswer from "../utils/isValidAnswer";

describe("Question", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test("renders the question and all answer buttons", () => {
    render(<Question />);

    expect(
      screen.getByRole("heading", { name: "QUESTION HERE" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  test("updates the component state and DOM when an answer is clicked", async () => {
    const user = userEvent.setup();
    render(<Question />);

    await user.click(screen.getByRole("button", { name: "Answer 2" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "User selected Answer 2!"
    );
  });

  test("calls the mocked event handler with the selected answer", async () => {
    const user = userEvent.setup();
    render(<Question />);

    await user.click(screen.getByRole("button", { name: "Answer 3" }));

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith("User selected Answer 3!");
  });

  test("handles multiple rapid clicks and keeps the last selected answer", () => {
    render(<Question />);

    fireEvent.click(screen.getByRole("button", { name: "Answer 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Answer 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Answer 4" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "User selected Answer 4!"
    );
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
    expect(consoleLogSpy).toHaveBeenLastCalledWith(
      "User selected Answer 4!"
    );
  });

  test("logs every click when the same answer is clicked rapidly", async () => {
    const user = userEvent.setup();
    render(<Question />);

    const answer = screen.getByRole("button", { name: "Answer 1" });
    await user.click(answer);
    await user.click(answer);
    await user.click(answer);

    expect(screen.getByRole("status")).toHaveTextContent(
      "User selected Answer 1!"
    );
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
  });

  describe("invalid input handling", () => {
    test("rejects values that are not valid answer numbers", () => {
      [0, 5, -1, 1.5, "2", null, undefined, NaN].forEach((answer) => {
        expect(isValidAnswer(answer)).toBe(false);
      });
    });

    test("accepts valid answer numbers", () => {
      [1, 2, 3, 4].forEach((answer) => {
        expect(isValidAnswer(answer)).toBe(true);
      });
    });
  });
});
