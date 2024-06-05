import ViewFactory from "../../shared/base/viewFactory.js";
import TableConsoleComponent from "./table.js";

export default class ConsoleFactory extends ViewFactory {
  createTable() {
    return new TableConsoleComponent();
  }
}
