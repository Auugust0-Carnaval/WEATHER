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
    console.log(this.cidade.name);

  }

  title = 'WEATHERDEV';

  apikey = "7400ce0aba7ac77509dede9456051077";

  jsonCity = '';

  Upper(string: string){
    let value = string.toUpperCase();
    return value;
  }

  getWeather(){
    var weather_url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.Inputcity + '&appid=' + this.apikey + '&units=metric';
    console.log(weather_url);

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
}
