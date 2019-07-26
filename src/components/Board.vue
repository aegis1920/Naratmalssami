<template>
  <tr @click="goDetail" style="cursor:pointer">
    <td>{{board.author}}</td>
    <td>{{board.title}}</td>
    <td>{{board.boardViewCount}}</td>
  </tr>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import {mapActions} from 'vuex'

export default {
	name: 'Board',
	props: {
	    board: {type: Object},
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
    ...mapActions(['addBoard']),
    updateBoardViewCountMethod(){
      FirebaseService.updateBoardViewCount(this.board.doc_id);
    },
    goDetail() {
      // vuex에 데이터 넣어놓기 + localStorage에 doc_id 넣어놓기
      this.addBoard(this.board);
      this.updateBoardViewCountMethod(); // 조회수 증가.
      localStorage.setItem('doc_id', this.board.doc_id);
      // router 이동
      this.$router.push({name:'boarddetail'});
    },
  }
}
</script>

<style scoped>

</style>
