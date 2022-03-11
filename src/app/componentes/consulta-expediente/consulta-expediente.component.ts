import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-consulta-expediente',
  templateUrl: './consulta-expediente.component.html',
  styleUrls: ['./consulta-expediente.component.css']
})
export class ConsultaExpedienteComponent implements OnInit {

  filtersForm = this.formBuilder.group({
    vcNroExpediente: ['412879-2010', [Validators.required]],
  });

  filteredCountries : any[]=[];
  selectedCountry: any[]=[];

  countries: any[]=[
    {
    "vcIdExpediente": "412879",
    "nuAnioExpediente": 2010
    },
    {
    "vcIdExpediente": "412877",
    "nuAnioExpediente": 2010
    },
    {
    "vcIdExpediente": "412878",
    "nuAnioExpediente": 2010
    }
    ]

  constructor(    private formBuilder: FormBuilder,

    ) { }

  ngOnInit() {
  }

  filterCountry(event : any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.countries.length; i++) {
        let country = this.countries[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredCountries = filtered;
}

}
