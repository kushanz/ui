import { Time } from "@angular/common";

export class InboxItem{
    id: number;
    type: string;
    data: any;
    filterType: string;
    date: Date;
    time: Time;
    submissionId:number;
    workflowInstaceId:number;
    completedBy:string;
    workflowName:string;
    identityValues: Array<IdentificationValue>;
}

export class InboxItemData{
    type : string;
    url: string;
    IdentificationValues: Array<IdentificationValue>;
}

export class IdentificationValue{
    fieldGuid: string;
    label:string;
    value: string;
}

export class workflowModal {
    itemCount:number;
    workflowId:number;
    workflowName:string;
}
export class workflowCountModal{
    inboxItems: InboxItem[];
    workflowName: string;
    workflowId: number;
    itemCount: number;
}