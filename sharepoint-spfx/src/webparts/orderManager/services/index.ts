import { IItemAddResult, IItem, SPRest, IFileAddResult, Item } from "@pnp/sp/presets/all";
import { IAttachmentInfo } from "@pnp/sp/attachments";

export default class OrderServices {
  protected _sp: SPRest;
  //constants
  private LISTNAME: string = "orders";
  private LIBRARY_NAME: string = "orderdocs";

  constructor(sp: SPRest) {
    this._sp = sp;
  }
  /**
   * add new order with attachment file
   * @param {OrderItem} order The new order item to raise.
   * @param {File} file The attachment file.
   */
  public createNewOrderItemAsync = async (
    order: Object,
    file?: File
  ): Promise<IItemAddResult> => {
    const res = await this._sp.web.lists.getByTitle(this.LISTNAME).items.add(order);
    file && res.item.attachmentFiles.add(file.name, file);
    return res;
  };

  public uploadToLibraryAsync = async (
    serverRelativeUrl: string,
    file: File
  ): Promise<IFileAddResult> =>
    await this._sp.web
      .getFolderByServerRelativeUrl(serverRelativeUrl + this.LIBRARY_NAME)
      .files.add(file.name, file, true);

  public getOrderItemAsync = async (orderId: number): Promise<any> => {
    const item = await this._sp.web.lists
      .getByTitle(this.LISTNAME)
      .items.getById(orderId);

    item.attachmentFiles.get().then((files) => {
      console.log(files);
    });
  };

  public getAllOrderItemsAsync = async (): Promise<Object[]> =>
    await this._sp.web.lists
      .getByTitle(this.LISTNAME)
      .items.expand("AttachmentFiles")
      .get();
}
