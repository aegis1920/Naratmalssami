<template>
  <tr @click="goDetail" style="cursor:pointer">
    <td>{{board.author}}</td>
    <td>{{board.title}}</td>
    <td>{{board.boardViewCount}}</td>
    <td>
      <v-layout xs12 v-show="modiOn">
        <v-flex xs6>
          <BoardModifyBtn
            :title="board.title"
            :body="board.body"
            :imgSrc="imgSrc"
            :doc_id="board.doc_id"
          />
        </v-flex>
        <v-flex xs6>
          <v-icon style="cursor: pointer" class="icon" small
                  @click.stop="deleteBoard">fas fa-trash-alt</v-icon>
        </v-flex>
      </v-layout>
    </td>
  </tr>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import {mapActions} from 'vuex'
import BoardModifyBtn from "./BoardModifyBtn";

export default {
    name: 'Board',
  components: {BoardModifyBtn},
  props: {
      board: {type: Object},
      date: {type: String},
      title: {type: String},
      body: {type: String},
      imgSrc: {type: String},
      doc_id: {type:String},
      boardViewCount: {type:Number},
      created_at:{type:String},
      author:{type:String},
      cur_user_id:{type:String},
	},
	data() {
		return {
			dialog: false,
            modiOn: false,
		}
	},
    methods:{
      ...mapActions(['addBoard']),
      updateBoardViewCountMethod(){
        FirebaseService.updateBoardViewCount(this.board.doc_id);
      },
      goDetail() {
        // localStorage에 doc_id 넣어놓기
        this.updateBoardViewCountMethod(); // 조회수 증가.
        localStorage.setItem('doc_id', this.board.doc_id);
        // router 이동
        this.$router.push({name:'boarddetail'});
      },
      isMyBoard() {
        //console.log('cur : ' + this.cur_user_id);
        let cur = FirebaseService.getUser();
        if(cur === this.author) {
          console.log('MyBoard');
          this.modiOn = true;
        }
      },
      deleteBoard() {
        FirebaseService.deleteBoard(this.doc_id);
        alert('글이 삭제되었습니다.');
        setTimeout(()=> {
          this.$emit('reload');
        }, 1000);
      }
    },
    created() {
      this.isMyBoard();
    }
}
</script>

<style scoped>

</style>
