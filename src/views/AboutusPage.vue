<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

<template>
<div>
  <ImgBanner :pagename="routeName()">
    <div style="line-height:1.2em; font-size:10vw; font-family: Aladdin;" slot="text">About Us</div>
  </ImgBanner>
  <v-container>
    <v-layout my-5>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex v-for="team in teams" xs12 sm6 lg3 pa-2>
            <v-hover>
            <v-card class="namecard"
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    @click="showRepo(team.userName)">
              <v-layout pa-2>
                <v-flex xs4>
                  <v-avatar size="100%" color="lime lighten-4">
                    <img :src="team.image">
                  </v-avatar>
                </v-flex>
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{team.name}} ({{team.age}})</div>
                      <div>{{team.description}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>
            </v-hover>
          </v-flex>
        </v-layout>

        <v-flex v-for="team in teams" xs12 >
          <v-layout xs12 :id="team.userName" style="display:none">
            <RepositoryList
                :token="team.token"
                :userName="team.userName"
            ></RepositoryList>
          </v-layout>
        </v-flex>

      </v-flex>
    </v-layout>

  </v-container>
</div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import RepositoryList from '../components/RepositoryList'

import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'AboutusPage',
  data() {
    return {
      token: '',
      userName: '',
      current: '',
      teams: [{
          name: '이민경',
          age: 26,
          description: '야오밍입니다.',
          url: 'https://lab.ssafy.com/mkl0819',
          image: require('@/assets/mk.png'),
          token: 'YwemDXZ5dD-Hxgx-dj5o',
          key: false,
          userName: 'mkl0819'
        },
        {
          name: '이상주',
          age: 28,
          description: '학벌 깡패입니다.',
          url: 'https://lab.ssafy.com/leesangju92',
          image: require('@/assets/sangju.png'),
          token: '5ixfc4xyRHiJyeWuyjVp',
          key: false,
          userName: 'leesangju92'
        },
        {
          name: '이호빈',
          age: 27,
          description: '그냥 깡패입니다.',
          url: 'https://lab.ssafy.com/aegis1920',
          image: require('@/assets/hobin.png'),
          token: '6izgztskLYEhJ__s4Jim',
          key: false,
          userName: 'aegis1920'
        },
        {
          name: '전의환',
          age: 27,
          description: '전의환 입니다.',
          url: 'https://lab.ssafy.com/jeon',
          image: require('@/assets/jeon.png'),
          token: 'nxzw23Tzc1aFThgMNEvo',
          key: false,
          userName: 'jeon'
        },
      ],
      show: false,
    }
  },
  components: {
    ImgBanner,
    RepositoryList
  },
  methods: {
    routeName() {
      return this.$route.name
    },
    showRepo(userName){
      if(this.current!=''){
        document.getElementById(this.current).style.display = 'none';
        if(this.current == userName){
          this.current = ''
          return;
        }
      }
        document.getElementById(userName).style.display = 'block';
        this.current = userName
    }
  }
}
</script>

<style>
.namecard {
  cursor: pointer;
   border-radius:20px;
}
</style>
