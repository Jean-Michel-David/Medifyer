import { Component } from '@angular/core';
import { Info } from 'src/app/info';
import { AdminInfosManagementService } from 'src/app/services/admin-infos-management.service';
import { InfosService } from 'src/app/services/infos.service';

@Component({
  selector: 'app-edit-infos',
  templateUrl: './edit-infos.component.html',
  styleUrls: ['./edit-infos.component.css']
})
export class EditInfosComponent {
  infos! : Info[];
  selectedForEdit! : string;
  editStatus! : string;

  constructor(private infoService : InfosService, private adminInfo : AdminInfosManagementService) {}

  ngOnInit(): void {
    this.infoService.getAllInfos().subscribe((infos) => {
      this.infos = infos;
    });
    this.selectedForEdit = "";
    this.editStatus = "saved";
  }

  onSelectForEdit(selected : string) : void {
    if (this.selectedForEdit !== selected) {
      this.selectedForEdit = selected;
      this.editStatus = "saved";
    }
    else this.selectedForEdit = "";
  }

  onTextChanged() {
    this.editStatus = "toSave";
  }

  onSave(label : string, text : string) : void {
    this.adminInfo.setInfo(label, text).subscribe((value) => {
      this.editStatus = "saved";
      const infoToChange = this.infos.find(inf => inf.label == label);
      if (infoToChange)
        infoToChange.text = text;
    })
  }
}
