<template>
  <!-- div -->
  <div>
    <welcome id="intro" />

    <!-- imgbanner -->
    <ImgBanner :pagename="routeName()">
      <div style="line-height:1.2em; font-size:10vw; font-family: Aladdin" slot="text">
        Welcome To
        <br />Aladdin
      </div>
    </ImgBanner>
    <!-- container -->
    <v-container>
      <!-- About Me -->
      <About></About>

      <!-- notificationTest -->

      <v-btn @click="notificationStart">Notification</v-btn>

      <!-- Board -->
      <v-layout my-5>
        <v-flex xs12>
          <router-link to="/Board" style="text-decoration:none;">
            <h2 class="my-5 text-xs-center page_title">Board</h2>
          </router-link>
          <BoardList></BoardList>
        </v-flex>
      </v-layout>

      <!-- Github -->
      <v-layout my-5>
        <v-flex xs12>
          <router-link to="/aboutus" style="text-decoration:none;">
            <h2 class="my-5 text-xs-center page_title">About Us</h2>
          </router-link>
          <v-card flat style="background-color:#fff0">
            <v-container fluid grid-list-lg style="background-color:#fff0;">
              <v-layout row wrap>
                <v-flex xs12 sm6 v-for="team in teams" :key="team.name">
                  <v-card
                    class="black--text"
                    style="min-width: 200px; min-height: 300px; background-color: #fff0; box-shadow: none!important;"
                  >
                    <Person
                      :name="team.name"
                      :description="team.description"
                      :image="team.image"
                      :url="team.url"
                    ></Person>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Header from "../components/Header";
import ImgBanner from "../components/ImgBanner";
import BoardList from "../components/BoardList";
import RepositoryList from "../components/RepositoryList";
import Footer from "../components/Footer";
import FirebaseService from "@/services/FirebaseService";

import Person from "../components/Person";
import About from "../components/About";
import welcome from "../components/welcome.vue";

export default {
  name: "HomePage",
  data() {
    return {
      teams: [
        {
          name: "이민경",
          age: 26,
          description: "야오밍입니다.",
          url: "https://lab.ssafy.com/mkl0819",
          //image: require('@/assets/ming.png'),
          image:
            "https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Heather&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light",
          token: "YwemDXZ5dD-Hxgx-dj5o",
          key: false,
          userName: "mkl0819"
        },
        {
          name: "이상주",
          age: 28,
          description: "학벌 깡패입니다.",
          url: "https://lab.ssafy.com/leesangju92",
          //image: require('@/assets/sang.png'),
          image:
            "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Blue03&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
          token: "XLZHQWzDiR5vY3px3oWu",
          key: false,
          userName: "mkl0819"
        },
        {
          name: "이호빈",
          age: 27,
          description: "그냥 깡패입니다.",
          url: "https://lab.ssafy.com/aegis1920",
          //image: require('@/assets/leehobin.jpg'),
          image:
            "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Round&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=Gray02&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light",
          token: "6izgztskLYEhJ__s4Jim",
          key: false,
          userName: "aegis1920"
        },
        {
          name: "전의환",
          age: 27,
          description: "다이애나 장인입니다.",
          url: "https://lab.ssafy.com/jeon",
          //image: require('@/assets/profile.png'),
          image:
            "https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=BeardMedium&facialHairColor=Brown&clotheType=GraphicShirt&clotheColor=Pink&graphicType=SkullOutline&eyeType=Surprised&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Tanned",
          token: "nxzw23Tzc1aFThgMNEvo",
          key: false,
          userName: "jeon"
        }
      ]
    };
  },
  components: {
    ImgBanner,
    BoardList,
    RepositoryList,
    Person,
    welcome,
    About
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    routeName() {
      return this.$route.name;
    },
    preLoader() {
      setTimeout(function() {
        var intro = document.getElementById("intro");
        intro.style.display = "none";
      }, 1900);
    },
    notificationStart() {
      FirebaseService.notificationService();
    }
  },
  mounted() {
    console.log(this.$store.state.intro);
    if (!this.$store.state.intro) {
      this.$store.state.intro = true;
      this.preLoader();
    } else {
      var intro = document.getElementById("intro");
      intro.style.display = "none";
    }
  }
};
</script>

<style>
</style>
