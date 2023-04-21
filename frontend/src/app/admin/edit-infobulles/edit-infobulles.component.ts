import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/info';
import { InfosService } from 'src/app/services/infos.service';

@Component({
  selector: 'app-edit-infobulles',
  templateUrl: './edit-infobulles.component.html',
  styleUrls: ['./edit-infobulles.component.css']
})
export class EditInfobullesComponent implements OnInit{
  infobulles! : Info[];

  constructor(private infoService : InfosService) {}
  
  ngOnInit(): void {
    this.infoService.getAllInfobulles().subscribe((infos) => {
      this.infobulles = infos;
    });
  }

}
