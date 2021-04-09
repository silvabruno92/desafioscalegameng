import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { Resultado } from '../model/resultado';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resultado = {nome: ''};
  resultadoChutes: number = 0;
  resultados: Observable<Resultado[]>;

  constructor(private gameService: GameService, private routeActive: ActivatedRoute) {}

  ngOnInit() {
    this.resultadoChutes = Number(this.routeActive.snapshot.paramMap.get('resultadoChutes'));
    // console.log(this.resultadoChutes);
    if (this.resultadoChutes != 0){
      
      this.gameService.getRankList().subscribe(data => {
      this.resultados = data;
      // console.log(this.resultados);
      });
      return false;
    }
    return true;
  }

  public jogar() {
    if(this.resultado.nome != 'undefined' && this.resultado.nome.trim() != '' ) {
      this.gameService.jogarBotao(this.resultado);
    } else {
      alert('Informe seu nome!');
    }
  }

}
