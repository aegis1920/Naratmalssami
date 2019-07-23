<style scoped>
  .v-dialog__content >>> .v-dialog {
    width: 50vw!important;
    height: auto!important;
  }
  @media screen and ( max-width:600px  ){
    .v-dialog__content >>> .v-dialog {
      width: 80vw!important;
      height: auto!important;
    }
  }
  /* .v-card, .v-sheet, .v-datatable, .v-datatable__actions, .theme--light.v-sheet {
   background-color: #ffffff87!important;
} */
</style>
<template>
<v-layout>
  <v-dialog>
      <!-- <v-dialog v-model="dialog"> -->
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark >Open Dialog</v-btn> -->
      <v-hover>
      <v-card v-on="on"
      style="max-width:400px;"
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="card-item"
      @click="updateBoardViewCountMethod"
      >
        <v-img :src="imgSrc" style="max-height:200px">
        </v-img>
        <v-card-title primary-title hover>
          <div>
            <div class="headline oneLine">{{title}}</div>
            <span class="grey--text body-txt oneLine">{{body}}</span>
            <span class="grey--text oneLine"><v-icon small class="mr-1">fas fa-eye</v-icon>{{boardViewCount}}</span>
            <span class="grey--text oneLine"><v-icon small class="mr-1">fas fa-clock</v-icon>{{created_at}}</span>
            <span class="grey--text oneLine"><v-icon small class="mr-1">fas fa-user</v-icon>{{author}}</span>
          </div>
        </v-card-title>
      </v-card>
    </v-hover>
    </template>

    <!-- <v-flex xs12 sm8 md6> -->
    <v-card  >
      <v-img :src="imgSrc" >
      </v-img>
      <v-card-title primary-title hover bottom>
        <div>
          <div class="headline">{{title}}</div>
          <span class="grey--text" >{{body}}</span>
        </div>
      </v-card-title>
    </v-card>

  <!-- </v-flex> -->
  </v-dialog>

</v-layout>

</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'Board',
	props: {
		date: {type: String},
		title: {type: String},
		body: {type: String},
		imgSrc: {type: String},
    doc_id: {type:String},
    boardViewCount: {type:Number},
    created_at:{type:String},
    author:{type:String}
	},
	data() {
		return {
			dialog: false,
		}
	},
  methods:{
    updateBoardViewCountMethod(){
      FirebaseService.updateBoardViewCount(this.doc_id);
    }
  }
}
</script>
