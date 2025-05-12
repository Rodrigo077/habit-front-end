import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CepInterface } from './cep.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  form!: FormGroup;
  cepInterface!: CepInterface;
  endereco: string = "";

  constructor(public homeService: HomeService, private router: Router)
  {}

  ngOnInit(): void{
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      endereco: new FormControl('')
    })
  }

  get f(){
    return this.form.controls;
  }

  buscarCep(cep:string){
    console.log("Valor: " + cep);
    this.homeService.getCep(cep).subscribe((data: CepInterface)=>{
      this.cepInterface = data;
      this.endereco = this.cepInterface.logradouro;
      console.log(this.cepInterface.logradouro);
    });
  }

  submit(){
    console.log(this.form.value);
    this.homeService.create(this.form.value).subscribe((response:any) => {
      console.log('Post ok');
      this.router.navigateByUrl('home');
    }
    );
  }
}
