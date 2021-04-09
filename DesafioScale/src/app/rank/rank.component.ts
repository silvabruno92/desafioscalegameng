import { Component, OnInit } from '@angular/core';
import { Resultado } from '../model/resultado';
import { GameService } from '../service/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  resultados: Observable<Resultado[]>;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getRankList().subscribe(data => {
      this.resultados = data;
      // console.log(this.resultados);
    });
  }

}
