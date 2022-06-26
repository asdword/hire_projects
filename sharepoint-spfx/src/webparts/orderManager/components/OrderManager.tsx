import * as React from "react";
import styles from "./OrderManager.module.scss";
import { IOrderManagerProps } from "./IOrderManagerProps";
import OrderManagerForm from "./OrderManagerForm";
import OrderManagerListDetails from "./OrderManagerListDetails";

export default class OrderManager extends React.Component<IOrderManagerProps, {}> {
  public render(): React.ReactElement<IOrderManagerProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      context,
    } = this.props;
    return (
      <section
        className={`${styles.orderManager} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <OrderManagerForm context={context} />
        <hr />
        <br />
        <OrderManagerListDetails context={context} />
      </section>
    );
  }
}
