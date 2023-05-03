import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CycleService } from 'src/app/services/cycle.service';

@Component({
  selector: 'app-root',
  templateUrl: './configurations.component.html',
})
export class ConfigurationsComponent implements OnInit {
  cycles: any;

  constructor(
    private cycleService: CycleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveCycles();
  }

  private retrieveCycles(): void {
    this.cycleService.getAll().subscribe(
      (data) => {
        this.cycles = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
