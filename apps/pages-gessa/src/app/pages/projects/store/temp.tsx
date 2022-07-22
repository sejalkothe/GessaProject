export interface IcreatedBy {
  userId: string;
  emailId: string;
}

export interface IAuthorization {
  res: string;
  scope: string;
  roles: Array<string>;
}

export interface IPolicies {
  name: string;
  type: string;
  logic: string;
  decisionStrategy: string;
  config: any;
}

export interface IResources {
  name: string;
  ownerManagedAccess: boolean;
  resourceScope: Array<string>;
}

export interface IPermissions {
  name: string;
  type: string;
  logic: string;
  decisionStrategy: string;
  config: any;
}
export interface IMenuList {
  createdBy: IcreatedBy;
  _id: string;
  name: string;
  localName: string;
  description: string;
  authorization: Array<IAuthorization>;
  localDescription: string;
  icon: string;
  parentId: string;
  policies: Array<IPolicies>;
  resources: Array<IResources>;
  permissions: Array<IPermissions>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
