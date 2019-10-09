export class RenderingTokenRequest{
    dataFormId: number;
    formId:number;
    formReferenceId:string;
    renderingMode:RenderingMode;
    disabledAllSections:boolean
}

export enum RenderingMode{
    newInstance = "newInstance",
    resumeExisting = "resumeExisting"
}