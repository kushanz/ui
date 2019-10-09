export class FormAssignment{
    id: number;
    userGroupId:number;
    userGroupName:string;
    formPermissions:Array<FormPermission>

    constructor(){
        this.formPermissions = new Array<FormPermission>()
    }
}

export class FormPermission{
    id:number;
    name:string;
    permissionData:any;
}