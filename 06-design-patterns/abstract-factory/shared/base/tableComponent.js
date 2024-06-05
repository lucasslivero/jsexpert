import NotImplementedException from "../notImplementedException.js";

export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name);
  }
}
