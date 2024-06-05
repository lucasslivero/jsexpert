import TableComponent from "../../shared/base/tableComponent.js";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    console.log("Chamou", data);
  }
}
