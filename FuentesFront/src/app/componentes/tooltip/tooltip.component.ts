import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {

  @Input() popTitle: string='';
  @Input() popDescripcion: string='';

  constructor() { }

  ngOnInit() {
  }

}
