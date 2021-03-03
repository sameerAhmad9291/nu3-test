import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(content: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.sentOTP(this.f.email.value)
      .subscribe(
        data => {
          this.modalService.open(content).result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  onVerified() {
    this.modalService.dismissAll();
    this.router.navigate(['/uploads']);
  }
}
