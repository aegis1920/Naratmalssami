<!--<template>-->
<!--    <v-container grid-list-md text-xs-center>-->
<!--        <v-layout row wrap>-->
<!--            <v-flex xs12 sm6 md6 offset-sm3>-->
<!--                <v-card dark color="primary">-->

<!--                </v-card>-->
<!--                <v-card dark class="weatherBack" style="border-radius:10px">-->
<!--                    <v-flex><h2>Weather In Seoul</h2></v-flex>-->
<!--                    <v-divider></v-divider>-->
<!--                    <v-layout>-->
<!--                    <v-flex xs3>-->
<!--                        <v-card-text class="px-0"><img :src="weatherIconURL"-->
<!--                        /></v-card-text>-->
<!--                    </v-flex>-->
<!--                    <v-flex xs9>-->
<!--                        <v-flex style="font-size:3rem">{{weatherTemp}} ºC</v-flex>-->
<!--                        <div>{{weatherTemp_min}}/{{weatherTemp_max}}</div>-->
<!--                        {{weatherDescription}}-->
<!--                    </v-flex>-->
<!--                    </v-layout>-->
<!--                </v-card>-->
<!--            </v-flex>-->
<!--        </v-layout>-->
<!--    </v-container>-->
<!--</template>-->
<template>
    <div style="display:flex; flex-wrap: wrap; align-items: center;">
        <strong>Weather In Seoul</strong>
        <img :src="weatherIconURL" style="max-width: 30px">
        <strong> {{weatherTemp}} ºC </strong>
    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        name: "Weather",
        data() {
            return {
                weatherInfo: null,
                weatherIcon: '',
                weatherIconURL:  '',
                weatherTemp: 0,
                weatherTemp_min: 0,
                weatherTemp_max: 0,
                weatherDescription: '',

            }
        },
        methods: {
            getWeather() {
                axios.get('https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=0f4c346fa511f272e247fd92dd844c8c')
                    .then(res => {
                        this.weatherInfo = res.data;
                        this.weatherIcon = res.data.weather[0].icon;
                        this.weatherDescription = res.data.weather[0].description;
                        this.makeIconUrl(); // Icon url 만들기
                        this.getTemp(); // 날씨 변환하기
                    });
            },
            makeIconUrl() {
              this.weatherIconURL = 'http://openweathermap.org/img/wn/'+ this.weatherIcon +'@2x.png';
            },
            getTemp() {
              this.weatherTemp = (this.weatherInfo.main.temp - 273.15).toFixed(1);
              this.weatherTemp_min = this.weatherInfo.main.temp_min - 273.15 ;
              this.weatherTemp_max = this.weatherInfo.main.temp_max - 273.15 ;
            },
        },
        mounted() {
            this.getWeather(); // 일단 최초 1회 실행
            setInterval(() => {
                this.getWeather();
            }, 5000);

        }
    }
</script>

<style scoped>
    .weatherBack {
        position: relative;
        background: #ceeaff;
        overflow: hidden;
        font-color: #fff;
    }
    .weatherBack:after{
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0.7;
        background-repeat: no-repeat;
        background-position: 50% 0;
        -ms-background-size: cover;
        -o-background-size: cover;
        -moz-background-size: cover;
        -webkit-background-size: cover;
        background-size: cover;
        background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrwp5ChqqRob6SiVBpL-ILSi4n48S8FHd0WxnTCpIpQT0rUyU9Q");
    }

    .weatherBack div {
        text-align: center;
        z-index: 2;
        position: relative;
        color: #fff;
    }


</style>
