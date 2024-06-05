import ViewFactory from "../../shared/base/viewFactory.js";
import TableBrowserComponent from "./table.js";

export default class BrowserFactory extends ViewFactory {
  createTable() {
    return new TableBrowserComponent();
  }
}
