<template>
  <div>
    <ImgBanner :pagename="routeName()">
      <div style="line-height:1.2em; font-size:10vw; font-family: Aladdin;" slot="text">BOARD</div>
    </ImgBanner>
    <v-container>

      <!-- Board -->
      <v-layout>
        <v-flex xs12>
          <BoardList :load-more="true"></BoardList>
        </v-flex>
      </v-layout>

    </v-container>
    <BoardWriteBtn />

  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import BoardList from '../components/BoardList'
import BoardWriteBtn from '../components/BoardWriteBtn.vue'

export default {
	name: 'BoardPage',
  components: {
		ImgBanner,
		BoardList,
    BoardWriteBtn
	},
  methods: {
    routeName(){
      return this.$route.name
    }
  }
}
</script>
