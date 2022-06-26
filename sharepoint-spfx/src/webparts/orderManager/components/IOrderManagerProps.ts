import { BaseWebPartContext } from "@microsoft/sp-webpart-base";

export interface IOrderManagerProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: BaseWebPartContext;
}
export interface IOrderManagerCommonProps {
  context: BaseWebPartContext;
}
export interface IOrderManagerFormState {
  isLoading: boolean;
  showMessageBar: boolean;
  message?: string;
  formdata?: IOrderItem;
  attachmentFile?: File;
}
export interface IOrderManagerListDetailsState {
  isLoading: boolean;
  gridItems?:object[]
}
export interface IOrderItem {
  Title?: string;
  ordernumber?: string;
  customername?: string;
  destination?: string;
  ownerId?: number;
}
