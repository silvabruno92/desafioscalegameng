import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Resultado } from '../model/resultado';

@Injectable({
  providedIn: 'root'
})
export class GameService {



  constructor(private http: HttpClient, private router: Router) { }

  getRankList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }


  jogarBotao(resultado) {
    var botaoJogar = document.getElementById("btnJogar");
    var inputNome = document.getElementById("nome");
    var botaoIniciar = document.getElementById("btnIniciar");

    if (botaoJogar.innerHTML == "Jogar") {

      // console.info("Aqui seu nome " + resultado.nome);
      botaoJogar.innerHTML = "Sair";
      inputNome.setAttribute("readonly", "true");
      botaoIniciar.hidden = false;

    } else {

      botaoJogar.innerHTML = "Jogar";
      inputNome.removeAttribute("readonly");
      botaoIniciar.hidden = true;

    }

  }

  salvarResultado(resultado): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, resultado);
  }

  primeirajogada(numeroEscolhido) {

    let totalAux = 1000;
    let guess = 500;
    localStorage.setItem("totalAux", totalAux.toString());
    localStorage.setItem("guess", guess.toString());
    localStorage.setItem("numeroEscolhido", numeroEscolhido.toString());
    
    // achar maneira de iniciar o timer
    
    // desabilitar edicao do numero escolhido
    var elNumeroEscolhido = document.getElementById("numero");
    elNumeroEscolhido.setAttribute("readonly", "true");
    
    // desabilitar botao de iniciar (ou desaparecer com ele)
    var elBtnComecarJogo = document.getElementById("btnComecarJogo");
    elBtnComecarJogo.setAttribute("disabled", "true");

  }

  reverterPrimeiraJogada() {
    document.getElementById("numero").removeAttribute("readonly");
    document.getElementById("btnComecarJogo").removeAttribute("disabled");
    document.getElementById("btnFinalizar").hidden = true;
  }

  iteracao(numeroEscolhido, escolha) {
    let totalAux = Number(localStorage.getItem("totalAux"));
    let guess = Number(localStorage.getItem("guess"));

    if (escolha == 'maior') {
        if(guess == totalAux) {
          guess = guess + 1;
          totalAux = totalAux + 1;
          localStorage.setItem("guess", guess.toString());
          localStorage.setItem("totalAux", totalAux.toString());
        } else {
          guess = Math.ceil(((totalAux - guess) / 2) + guess);
          localStorage.setItem("guess", guess.toString());
          console.log(guess);
          console.log(totalAux);
        }

    } else if (escolha == 'menor') {
        if(guess == totalAux) {
          guess = guess - 1;
          totalAux = totalAux - 1;
          localStorage.setItem("guess", guess.toString());
          localStorage.setItem("totalAux", totalAux.toString());
        } else {
            var aux = guess;
            guess = Math.ceil(guess - ((totalAux - guess) / 2));
            totalAux = aux;
            localStorage.setItem("guess", guess.toString());
            localStorage.setItem("totalAux", totalAux.toString());
            console.log(guess);
            console.log(totalAux);
        }

    } else if (escolha == 'igual') {
      if (guess == Number(localStorage.getItem("numeroEscolhido"))) {
        alert('Victory!');
         //PUXA ROTINA DE VITORIA
          document.getElementById("btnFinalizar").removeAttribute("hidden");
          document.getElementById("jogadas").removeAttribute("hidden");
          
        }
      } else {
        alert('Ops! O jogo ainda nao acabou!'); 
      }
      
  }


}


