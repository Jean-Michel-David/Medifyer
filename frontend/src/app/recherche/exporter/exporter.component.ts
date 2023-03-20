import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.css']
})
export class ExporterComponent {
  exportData(question : string){

    const blob = new Blob([question], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "questionDeRecherche.txt");
  }
}
