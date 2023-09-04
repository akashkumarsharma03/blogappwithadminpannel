import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthGuard } from '../authgurad.service';



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  public userForm: FormGroup
  formdata: any
  ipAddress: string | undefined;
  check:boolean=false;
  checklogin:boolean=false

  constructor(private fb: FormBuilder, private apiservice: ApiService, private ip: AuthGuard) {
    this.userForm = this.fb.group({
      name: '',
      email: '',
      password: '',
    });
  }


  ngOnInit(): void {
    this.getIP();
  }

  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log('ip', this.ipAddress)
    });
  }

 otp(){

 }

  setValue() {
    this.formdata = {
      "name": this.userForm.get('name')?.value,
      "email": this.userForm.get('email')?.value,
      "password": this.userForm.get('password')?.value,
      "ip": this.ipAddress
    }

    localStorage.setItem("email",this.userForm.get('email')?.value)

    this.apiservice.signinuser((this.formdata)).subscribe(
      res => {
        console.log(res)
        if(res){
          this.check = true
        }
      }
    )

  }

}
