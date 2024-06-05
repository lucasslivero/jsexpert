import TableComponent from "../../shared/base/tableComponent.js";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    window.alert(JSON.stringify(data));
  }
}
