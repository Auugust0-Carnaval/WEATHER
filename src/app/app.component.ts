import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { City } from './models/Citymodel';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  cidade : City = {
    temp : '',
    humidity: '',
    name: '',
    pressure: '',
    message : ''

  }

  Inputcity: any  = ''; // valor da cidade inserida

  ngOnInit(): void {
  }

  loading: any; // variavel de controle para exibição do 'loading'

  loadingTimer: any;

  title = 'WEATHERDEV';

  apikey = "7400ce0aba7ac77509dede9456051077";

  jsonCity = '';

  isColorTrue: any  = true;

  Upper(string: string){
    let value = string.toUpperCase();
    return value;
  }

  getWeather(){
    this.showLoading();
    var weather_url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.Inputcity + '&appid=' + this.apikey + '&units=metric';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', weather_url, true);
    xhr.onreadystatechange = () =>{
      if(xhr.readyState === 4 && xhr.status === 200){
        var weather_data = JSON.parse(xhr.responseText);
        this.displayWeather(weather_data);
      }
    };
    xhr.send();
  }

  displayWeather(weather_data: any){
    this.cidade.temp = weather_data.main.temp;
    this.cidade.humidity = weather_data.main.humidity;
    this.cidade.name = weather_data.name;
    this.cidade.pressure = weather_data.pressure;
    this.cidade.message = weather_data.message;

  }

  // functions de loading
  showLoading(){
    this.loadingTimer = setTimeout(() =>{
      this.loading = true;
    },100);

    setTimeout(() =>{
      this.hideLoading();
    },250)
  }
  hideLoading(){
    clearTimeout(this.loadingTimer);
    this.loading = false;
  }


}
