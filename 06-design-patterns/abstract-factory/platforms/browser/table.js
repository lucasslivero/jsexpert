import TableComponent from "../../shared/base/tableComponent.js";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    document.body.insertAdjacentHTML("afterbegin", template);
  }

  prepareData(data) {
    const [firstItem] = data;
    const tHeaders = Object.keys(firstItem).map(
      (text) => `<th class="border border-black">${text}</th>`
    );
    const joinList = (list) => list.join("");
    const tBody = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => `<td class="border border-black">${value}</td>`))
      .map((tds) => `<tr>${joinList(tds)}</tr>`);
    const template = `
    <table class="table-auto border border-2 border-black border-collapse w-full">
      <thead>
        <tr>
        ${joinList(tHeaders)}
        </tr>
      </thead>
      <tbody>
        ${joinList(tBody)}
      </tbody>
    </table>
    `;
    return template;
  }
}
