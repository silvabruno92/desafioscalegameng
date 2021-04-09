import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resultado } from '../model/resultado';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  resultado = new Resultado();
  numeroEscolhido: number;
  // tempoTotal: number;
  jogadas = [];
  chute: number;
  tentativa = 0;
  escolhaResposta: string;
  nome: string;

  time: number = 0;
  display;
  interval;

  constructor(private routeActive: ActivatedRoute, private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.nome = this.routeActive.snapshot.paramMap.get('nome');
    if(this.nome != null) {
      this.resultado.nome = this.nome;
      // console.log("Valor repassado: " + this.resultado.nome);
    } else {
      alert('Informe seu nome antes de jogar');
      this.router.navigate(['home']);
    }
  }

  comecarJogo() {
    // console.log(this.numeroEscolhido);
    if(this.numeroEscolhido < 1) {
      alert('Escolha um numero entre 1 e 1000.');

    } else if (this.numeroEscolhido > 1000) {
      alert('Escolha um numero entre 1 e 1000.');

    } else {
      this.gameService.primeirajogada(this.numeroEscolhido);
      this.chute = Number(localStorage.getItem("guess"));
      this.tentativa = this.tentativa + 1;
      this.startTimer();
      
    }

  }

  escolha1() {
    this.escolhaResposta = 'maior';
    // this.gameService.iteracao(this.numeroEscolhido, this.escolhaResposta);
    // this.chute = Number(localStorage.getItem("guess"));
    // this.tentativa = this.tentativa + 1;
    // this.jogadas.push("Escolheu " + this.escolhaResposta);
    this.iteracaoPush();
    this.attVariaveisLocais();
  }

  escolha2() {
    this.escolhaResposta = 'menor';
    // this.gameService.iteracao(this.numeroEscolhido, this.escolhaResposta);
    // this.chute = Number(localStorage.getItem("guess"));
    // this.tentativa = this.tentativa + 1;
    // this.jogadas.push("Escolheu " + this.escolhaResposta);
    this.iteracaoPush();
    this.attVariaveisLocais();
  }

  escolha3() {
    this.escolhaResposta = 'igual';
    // this.gameService.iteracao(this.numeroEscolhido, this.escolhaResposta);
    // this.jogadas.push("Escolheu " + this.escolhaResposta);
    this.iteracaoPush();
    var guess = Number(localStorage.getItem("guess"));
    if (guess == Number(localStorage.getItem("numeroEscolhido"))){
      this.pauseTimer();
      document.getElementById("jogadas").innerHTML = JSON.stringify(this.jogadas);
      this.jogadas = [];
    }
  }

  attVariaveisLocais(){
    this.chute = Number(localStorage.getItem("guess"));
    this.tentativa = this.tentativa + 1;
  }

  iteracaoPush() {
    this.gameService.iteracao(this.numeroEscolhido, this.escolhaResposta);
    this.jogadas.push("Escolheu " + this.escolhaResposta);
  }

  finalizadoJogo() {
    
    this.resultado.numeroChutes = this.tentativa;
    this.resultado.tempoVitoria = this.time;
    this.gameService.salvarResultado(this.resultado).subscribe(data => {
      console.log(this.resultado); 
      alert('resultado salvo!');     
    });
    // console.log(this.jogadas);
    

    if(confirm('Play again?')){
          this.router.navigate(['jogo', this.nome]);
          this.novo();
        
    } else {

          // this.gameService.getRankList();
          this.router.navigate(['home', this.resultado.numeroChutes]);
    }
  }

  novo() {
    this.resultado = new Resultado();
    this.resultado.nome = this.nome;
    // this.tempoTotal = 0;
    this.numeroEscolhido = undefined;
    this.chute = undefined;
    this.tentativa = 0;
    this.time = 0;
    this.gameService.reverterPrimeiraJogada();
  }

  startTimer() {
    console.log("=====>");
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display = this.time
    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

}
