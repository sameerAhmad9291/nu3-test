import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.sass']
})
export class VerifyOtpComponent implements OnInit {

  @Input()
  email!: string;
  @Output() verified = new EventEmitter<string>();

  verifyOtpForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {

    this.verifyOtpForm = this.formBuilder.group({
      otpCode: ['', Validators.required],
    });

  }

  ngOnInit() {

  }

  get f() { return this.verifyOtpForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.verifyOtpForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.verifyOTP(this.email, this.f.otpCode.value)
      .subscribe(
        data => {
          this.verified.emit(data?.jwtData);
        },
        error => {
          this.loading = false;
        });
  }
}
