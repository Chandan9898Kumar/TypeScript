import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react"; // Add this import
import Practice from "./Practice";
import "@testing-library/jest-dom";

describe("Practice Component", () => {
  it("Render header", async () => { // Make the test async
    await act(async () => {
      render(<Practice />);
    });
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  it("Test Button", async () => { // Make the test async
    await act(async () => {
      render(<Practice />);
    });
    const buttonText = screen.getByText("Add");
    expect(buttonText).toBeInTheDocument();
    const buttonElement = screen.getByTestId("btn");
    expect(buttonElement).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.click(buttonElement);
    });
    
    const counterElement = screen.getByTestId("counter");
    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent("Counter: 1");
  });

  it('test input field', async () => { // Make the test async
    await act(async () => {
      render(<Practice />);
    });
    const inputElement = screen.getByTestId('input');
    
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: 'Hello' } });
    });
    
    expect(inputElement).toHaveValue('Hello');
    const inputTextElement = screen.getByTestId('inputValue');
    expect(inputTextElement).toBeInTheDocument();
    expect(inputTextElement).toHaveTextContent('Input Value: Hello');
  });
});
