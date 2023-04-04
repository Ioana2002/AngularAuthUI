import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export interface Profile{
  name: string,
  guid: string;
}

@Component({
  selector: 'app-eveniment-inscriere',
  templateUrl: './eveniment-inscriere.component.html',
  styleUrls: ['./eveniment-inscriere.component.scss']
})
export class EvenimentInscriereComponent implements OnInit{

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

    tipTaxa = [
      { name: "Caz social" ,value: "" },
      { name: "Activitate" ,value: "" },
      { name: "Excursie 1" ,value: "50 RON (O zi)" },
      { name: "Excursie 2" ,value: "100 RON (Doua zile)" },
      { name: "Excursie 3" ,value: "150 RON (Trei zile)" },
      { name: "Excursie 3-5" ,value: "200 RON (3-5 zile)" }]

      registerModel = this.fb.group({
        GuidParticipant: ['', Validators.required],
        NumeParticipant: [''],
        TipTaxa: ['', Validators.required]
      });

      visibleName:boolean = false;
      participareId:string = '';

      showDeleteButton: boolean = false;
      filteredParticipants?: Observable<Profile[]>;
      profiles: Profile[]= [];
      idEveniment: any = '';
      eveniment: {
        denumire: string;
        evenimentId: string;
        id: number;
        tipTaxa: string;
        tipEveniment: string;
      } | any = {
          denumire: ''
        };

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.idEveniment = params.get("id")

      this.service.getEvent(this.idEveniment).subscribe((response: any) => {
        this.eveniment = response;
        this.service.getProfiles().subscribe(
              (response: any) => {
                response.forEach((profile:any)=>{
                  var pName = profile.nume + " " + profile.prenume;
                  var pGuid = profile.profileId;
                  this.profiles?.push({name: pName, guid: pGuid})
                })
                this.filteredParticipants = this.registerModel.get("GuidParticipant")?.valueChanges.pipe(
                  startWith(''),
                  map(value => (typeof value === 'string' ? value : value!.name)),
                  map(name => (name ? this._filter(name) : this.profiles.slice())),
                );
                this.service.getInscriere(this.idEveniment).subscribe((response:any) =>{
                  if(response != null)
                  {
                    this.registerModel.patchValue({
                      GuidParticipant: response.participantGuid,
                      TipTaxa: response.tipTaxa
                    })
                    this.registerModel.get('NumeParticipant')?.setValue(response.participantNume)
                    
                    this.participareId = response.participareId;
                    if(response.validDocumente == null)
                    {
                      this.visibleName = true;
                    }
                  }
                })
              },
              (err: any) => {
                console.log(err);
              }
            );
          
      }, (err) => {
        console.log(err);
      })
    })
      
  }

  displayFn(profile: Profile): string {
    return profile && profile.name ? profile.name : '';
  }

  private _filter(name: string): Profile[] {
    const filterValue = name.toLowerCase();

    return this.profiles.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  RegisterToEvent() {
    //console.log(this.registerModel.get('GuidPilot')?.value,this.registerModel.get('GuidCopilot')?.value)
    if (!this.registerModel.valid) {
      // this.toastr.error(
      //   'Va rugam sa completati toate campurile obligatorii',
      //   'Eroare',
      //   {
      //     timeOut: 4000,
      //     extendedTimeOut: 0,
      //   }
      // );
    }
    else {
      var body = {
        EvenimentId: this.idEveniment,
        ParticipantGuid: this.registerModel.get('GuidParticipant')?.value!.guid
      };
      this.service.registerToEvent(body).subscribe((response: any) => {
        // this.toastr.success(
        //   'Ati fost inregistrat cu succes la acest eveniment.',
        //   'Succes',
        //   {
        //     timeOut: 4000,
        //     extendedTimeOut: 0,
        //   }
        // );
        this.router.navigate(['/event', this.idEveniment]);
      }, (err: { status: number; }) => {
        if (err.status == 400) {
          console.log(err);
        }
      })
    }
  }

  GoToRegister() {
    this.router.navigate(['/event', this.idEveniment])
  }

  DeleteRegister()
  {
    this.service.deleteParticipation(this.participareId).subscribe((response:any) =>{
      this.router.navigate(['/event', this.idEveniment])
    }, (err: any) => {
      console.log(err);
    })
  }

}
