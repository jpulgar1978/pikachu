import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
})
export class MenuprincipalPage implements OnInit {

  constructor(private router:Router) { }

  ReDireccionar(){
    this.router.navigate(['/gameone']);
  }

  ngOnInit() {
  }

}
