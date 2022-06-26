import React from "react";
import { DefaultButton, FontIcon } from "office-ui-fabric-react";
import { sp } from "@pnp/sp/presets/all";
import OrderServices from "../services";
import {
  IOrderManagerListDetailsState,
  IOrderManagerCommonProps,
} from "./IOrderManagerProps";
import { IViewField, ListView } from "@pnp/spfx-controls-react";
//components
export default class OrderManagerListDetails extends React.Component<
  IOrderManagerCommonProps,
  IOrderManagerListDetailsState
> {
  private services: OrderServices;
  //ctor
  constructor(props) {
    super(props);
    this.state = {
      gridItems: [],
      isLoading: false,
    };
    sp.setup({
      spfxContext: this.props.context,
    });
    this.services = new OrderServices(sp);
  }
  componentDidMount() {
    this.grepGridData();
  }
  private grepGridData = async () => {
    const data = await this.services.getAllOrderItemsAsync();
    this.setState({ gridItems: data });
    console.log(data);
  };

  public render(): React.ReactNode {
    const { gridItems } = this.state;
    return (
      <div>
        <DefaultButton onClick={this.grepGridData}>Refresh</DefaultButton>
        <ListView
          items={gridItems || []}
          viewFields={this.viewFields}
          iconFieldName="ServerRelativeUrl"
          compact={true}
          showFilter={true}
          defaultFilter=""
          filterPlaceHolder="Search..."
          dragDropFiles={false}
          stickyHeader={true}
        />
      </div>
    );
  }
  private viewFields: IViewField[] = [
    {
      name: "ordernumber",
      displayName: "OrderNumber",
      maxWidth: 90,
    },
    {
      name: "customername",
      displayName: "CustomerName",
      maxWidth: 120,
    },
    {
      name: "destination",
      displayName: "Destination",
    },
    {
      name: "files",
      displayName: "Files",
      maxWidth: 120,
      render: (item, i, col) => {
        if (item.Attachments)
          return (
            <DownloadAttachment
              href={item["AttachmentFiles.0.ServerRelativePath.DecodedUrl"]}
            />
          );
        return "-";
      },
    },
    {
      name: "status",
      displayName: "Status",
      maxWidth: 100,
    },
  ];
}
const DownloadAttachment = ({ href }) => {
  return (
    <a href={href}>
      FileLink
      <FontIcon iconName="Dictionary" />
    </a>
  );
};
