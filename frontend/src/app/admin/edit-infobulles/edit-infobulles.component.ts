import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/info';
import { AdminInfosManagementService } from 'src/app/services/admin-infos-management.service';
import { InfosService } from 'src/app/services/infos.service';

@Component({
  selector: 'app-edit-infobulles',
  templateUrl: './edit-infobulles.component.html',
  styleUrls: ['./edit-infobulles.component.css']
})
export class EditInfobullesComponent implements OnInit{
  infobulles! : Info[];
  selectedForEdit! : string;
  editStatus! : string;

  constructor(private infoService : InfosService, private adminInfo : AdminInfosManagementService) {}

  ngOnInit(): void {
    this.infoService.getAllInfobulles().subscribe((infos) => {
      this.infobulles = infos;
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
      const infoToChange = this.infobulles.find(inf => inf.label == label);
      if (infoToChange)
        infoToChange.text = text;
    })
  }
}
