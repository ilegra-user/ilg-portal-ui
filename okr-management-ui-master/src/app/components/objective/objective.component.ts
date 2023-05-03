import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CycleService } from 'src/app/services/cycle.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-root',
  templateUrl: './objective.component.html',
})
export class ObjectiveComponent implements OnInit {
  cycle: any;
  cycles: any;
  objectives: any;
  objectivesIlegra: any;
  team: any;
  teams: any;
  test: any;
  defaultTeam: boolean;

  constructor(
    private cycleService: CycleService,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.retrieveCycles();
    this.retrieveTeams();
    this.defaultTeam = false;
  }



  private retrieveCycles(): void {
    this.cycleService.getAll().subscribe(
      (data) => {
        this.cycles = data;

        if (data.length > 1) {
          let actualDate = new Date();

          var cycle = data.filter((cycle: any) => {
            let startDate = new Date(cycle.startDate);
            let endDate = new Date(cycle.endDate);

            return actualDate >= startDate && actualDate <= endDate;
          });

          if (cycle.length > 0) {
            this.cycle = cycle[0];
          } else {
            this.cycle = this.cycles[0];
          }
        } else {
          this.cycle = this.cycles[0];
        }

        this.retrieveObjectives();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public retrieveObjectives(): void {
    this.cycleService.getAllObjectives(this.cycle.id).subscribe(
      (data) => {
        this.test = data;
        this.objectives = data;
        this.retrieveIlegraObjectives();
        this.scroll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public retrieveTeams(): void {
    this.teamService.getAll().subscribe(
      (data) => {
        this.teams = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public retrieveFilteredObjectives(): void {
    this.cycleService
      .getAllObjectivesByCycleAndTeam(this.cycle.id, this.team.id)
      .subscribe(
        (data) => {
          this.objectives = data;
          this.defaultTeam = true;

          this.scroll();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public scroll() {
   
    let el = document.getElementById("objective-list");
   
      setTimeout(function() {
        el?.scrollIntoView();    
      }, 1000);

    
  }

  public retrieveIlegraObjectives(): void {

    const cycleId = this.cycle.id;
    const ilegraId = 1;
    this.cycleService
      .getAllObjectivesByCycleAndTeam(cycleId, ilegraId)
      .subscribe(
        (data) => {
          this.objectivesIlegra = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public cleanFilter(): void {
    this.team = null;
    this.retrieveObjectives();
  }
}
