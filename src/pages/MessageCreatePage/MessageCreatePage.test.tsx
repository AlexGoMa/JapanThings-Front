import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store/store";
import MessageCreatePage from "./MessageCreatePage";

describe("Given a RegisterPage component", () => {
  describe("When invoked", () => {
    test("Then it should render 3 input text fields", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <MessageCreatePage />
          </Provider>
        </BrowserRouter>
      );

      expect(screen.getByLabelText("Write your message")).toBeInTheDocument();
      expect(screen.getByLabelText("Category")).toBeInTheDocument();
      expect(screen.getByLabelText("Upload image")).toBeInTheDocument();
    });
  });
});
