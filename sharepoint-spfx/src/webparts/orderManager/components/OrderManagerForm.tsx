import React from "react";
import {
  TextField,
  Label,
  PrimaryButton,
  SpinButton,
  Spinner,
  Stack,
  MessageBar,
  MessageBarType,
  SpinnerSize,
} from "office-ui-fabric-react";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from "@pnp/sp/presets/all";
import OrderServices from "../services";
import { IOrderManagerFormState, IOrderManagerCommonProps } from "./IOrderManagerProps";
//components
export default class OrderManagerForm extends React.Component<
  IOrderManagerCommonProps,
  IOrderManagerFormState
> {
  private services: OrderServices;
  //ctor
  constructor(props) {
    super(props);
    this.state = initialState;
    sp.setup({
      spfxContext: this.props.context,
    });
    this.services = new OrderServices(sp);
  }
  async componentDidMount() {
    const res = await this.services.getOrderItemAsync(1);
    console.log(res);
  }
  //actions
  private setMessage(message: string) {
    this.setState({
      showMessageBar: true,
      message,
    });
  }
  //events
  onSubmit = async (e) => {
    e.preventDefault();
    //create order with title
    const orderItem = {
      ...this.state.formdata,
      Title: `Order-${new Date().toISOString()}`,
    };
    try {
      this.setState({ isLoading: true });
      await this.services.createNewOrderItemAsync(orderItem, this.state.attachmentFile);
      this.setMessage("Item Added Sucessfully");
    } catch (error) {
      this.setMessage("Something wrong!");
    } finally {
      this.setState({ isLoading: false });
    }
  };
  onChangePeoplePickerItems = (items) => {
    let formdata = this.state.formdata;
    formdata.ownerId = items[0].id;
    this.setState({ formdata });
  };
  onChangeInput = (name, e) => {
    const { value } = e.target;
    let formdata = this.state.formdata;
    formdata[name] = value;
    this.setState({ formdata });
  };
  onChangeFiles = (e) => this.setState({ attachmentFile: e.target.files[0] });

  public render() {
    const { formdata, isLoading, showMessageBar, message } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        {showMessageBar && (
          <MessageBar
            onDismiss={() => this.setState({ showMessageBar: false })}
            dismissButtonAriaLabel="Close"
          >
            {message}
          </MessageBar>
        )}
        <Label>Order Number</Label>
        <SpinButton
          defaultValue=""
          value={formdata?.ordernumber}
          onChange={this.onChangeInput.bind(this, "ordernumber")}
        />
        <Label>Customer Name</Label>
        <TextField
          required={true}
          value={formdata?.customername}
          onChange={this.onChangeInput.bind(this, "customername")}
        />
        <Label>Destination</Label>
        <TextField
          required={true}
          value={formdata.destination}
          onChange={this.onChangeInput.bind(this, "destination")}
        />
        <PeoplePicker
          context={this.props.context as any}
          titleText="Owner"
          personSelectionLimit={1}
          ensureUser={true}
          showtooltip={true}
          required={true}
          onChange={this.onChangePeoplePickerItems}
          showHiddenInUI={true}
          principalTypes={[PrincipalType.User]}
        />
        <Label>File</Label>
        <input type="file" onChange={this.onChangeFiles} />
        <br />
        <br />
        <PrimaryButton title="Submit" type="submit" disabled={isLoading}>
          Submit {isLoading && <Spinner size={SpinnerSize.xSmall} />}
        </PrimaryButton>
      </form>
    );
  }
}
//initial state
const initialState: IOrderManagerFormState = {
  formdata: {},
  isLoading: false,
  showMessageBar: false,
};
