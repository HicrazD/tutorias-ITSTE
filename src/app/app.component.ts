import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  anterior:string = ''
  actual:string = ''
  title = 'TutoriasResidencia';
  
  constructor(private router:Router){}
  ngOnInit(){
    this.actual = window.location.pathname;
    //console.log(window.location.pathname)
  }

  regresar(){

    this.router.navigate([this.anterior])
  }
  ngDoCheck(): void{
    if(this.actual != window.location.pathname ){
      this.anterior = this.actual
    }    
    this.actual = window.location.pathname;
  }  
}
