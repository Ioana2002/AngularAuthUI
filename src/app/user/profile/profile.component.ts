import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private service: AuthService
  ) {}

  profileModel = this.fb.group({
    Nume: ['', Validators.required],
    Prenume: ['', Validators.required],
    Gen: ['', Validators.required],
    Telefon: ['', Validators.required],
    Oras: ['', Validators.required],
    Adresa: ['', Validators.required],
    Judet: ['', Validators.required],
    SerieCI: ['', Validators.required],
    NrCI: ['', Validators.required],
    CNP: ['', Validators.required],
    DataEliberareCI: ['', Validators.required],
    DataExpirareCI: ['', Validators.required],
    CIEliberatDe: ['', Validators.required],
    Tara: ['', Validators.required],
    PozaCI: ['', Validators.required],
    PozaPermis: ['', Validators.required],
    NumarPermis: ['', Validators.required],
    DataExpirarePermis: ['', Validators.required],
    TipMasina: [''],
    Club: ['', Validators.required],
    LicentaFRAS: [''],
    NumarConcurs: [],
    TipLicenta: ['', Validators.required],
  });

  ngOnInit(): void {}

}


