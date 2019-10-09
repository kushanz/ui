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
