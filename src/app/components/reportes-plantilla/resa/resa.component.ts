import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { InformeAsistenciasComponent } from '../informe-asistencias/informe-asistencias.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-resa',
  templateUrl: './resa.component.html',
  styleUrls: ['./resa.component.css']
})
export class ResaComponent {
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  verResultados(): void {
    const modalRef = this.dialog.open(InformeAsistenciasComponent, {
      width: '1300px'
    });
  }  


  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
      console.log(dataString)
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

}
