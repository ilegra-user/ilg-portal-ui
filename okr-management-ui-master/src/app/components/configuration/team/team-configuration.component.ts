import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { DialogService } from 'src/app/services/dialog.service';
import { TeamConfigurationDialogComponent } from './team-configuration-dialog.component';

@Component({
  selector: 'team-configuration',
  templateUrl: './team-configuration.component.html',
})
export class TeamConfigurationComponent implements OnInit {
  teams: any = null;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveTeams();
  }

  openTeamDialog(teamId: any): void {
    var dialogRef = this.dialog.open(TeamConfigurationDialogComponent, {
      data: {
        dialogTitle: `${teamId ? 'Editar' : 'Nova'} Equipe`,
        teamId: teamId,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.retrieveTeams();
      }
    });
  }

  removeTeam(teamId: any): void {
    const options = {
      title: 'Atenção',
      message: 'Tem certeza que deseja excluir esta equipe?',
      cancelText: 'Não',
      confirmText: 'Sim',
    };

    this.dialogService.confirm(options).subscribe((res) => {
      if (res) {
        this.teamService.delete(teamId).subscribe((data) => {
          this.teams.splice(
            this.teams.findIndex((team: any) => team.id == teamId),
            1
          );
          this.dialogService.show('A equipe foi excluída com sucesso!');
        });
      }
    });
  }

  private retrieveTeams(): void {
    this.teamService.getAll().subscribe(
      (data) => {
        this.teams = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
