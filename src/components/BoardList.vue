<template>
    <div v-infinite-scroll="getNumBoards"
        infinite-scroll-disabled="busy"
    >
        <v-layout mt-5 wrap>
            <table class="content-table">
                <thead>
                    <tr>
                        <th style="width:20%">작성자</th>
                        <th style="width:50%">제목</th>
                        <th style="width:20%">조회수</th>
                        <th style="width:10%"></th>
                        <th style="width:10%"></th>
                    </tr>
                </thead>
                <tbody>
                    <Board v-for="board in showBoards"
                          :board="board"
                          :title="board.title"
                          :author="board.author"
                          :body ="board.body"
                          :boardViewCount ="board.boardViewCount"
                          :cur_user_id="cur_user_id"
                          :imgSrc="board.img"
                          :doc_id="board.doc_id"
                          @reload="getget"
                    ></Board>
                    <tr v-if="loading">
                        <td colspan="5" >
                            <v-img :src="loadingSrc" style="width:50px; margin: auto" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </v-layout>
    </div>
</template>
<script>
import Board from '@/components/Board'

import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'BoardsList',
  props: {
    limit: {
      type: Boolean,
      default: false,
    },
    loadMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      start: 0, // 몇번째인가
      cur : 0, // 현재 몇개를 불러왔는가
      num : 6, // 몇개씩 가져올 것인가
      cur_user_id: '',
      boards: [],
      showBoards: [],
      busy: false,
      loading: false,
      loadingSrc: require('@/assets/Infinity-7.6s-200px.gif'),
    }
  },
  components: {
    Board
  },
  methods: {
     async getNumBoards() {
          this.loading = true;
          this.busy = true;
          let arr = [];
          arr = await FirebaseService.getNumBoard(this.start, this.num, this.cur);

          if(arr === null) {
              this.busy = true;
              this.loading = false;
              return;
          }
          this.showBoards = this.showBoards.concat(arr);
          this.start += this.num;
          this.cur += this.num;
          this.busy = false;
         this.loading = false;
     },
     async getBoards() {
         console.log('getboard');
         
         this.boards = await FirebaseService.getBoards();
         this.showBoards = this.boards.splice(this.start, this.end);
     },
     getget() {
         this.showBoards = [];
         this.start = 0; this.cur = 0;
         this.getNumBoards();
         this.busy = false;
     },
  },
   async mounted() {
      if(this.limit) { // 더이상 로딩 안하고 6개만 딱 보여주기 + 더보기 버튼
          this.busy = true;
          let arr = await FirebaseService.getNumBoard(this.start, this.num, this.cur);
          this.showBoards = this.showBoards.concat(arr);
      }
    }
}
</script>
<style>
    .content-table{
        border-collapse: collapse;
        margin: auto;
        font-size: 0.9em;
        min-width: 400px;
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        table-layout: fixed;
    }

    .content-table thead tr {
        background-color: #986a08 !important;
        font-weight: bold;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .content-table th,
    .content-table td {
        padding: 12px 15px;
    }

    .content-table tbody tr {
        border-bottom: 1px solid #dddddd;
        background-color: white;
    }

    .content-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    .content-table tbody tr:last-of-type {
        border-bottom: 2px solid #986a08 !important;
    }

    @media screen and (min-width: 600px) and (max-width: 960px){
        .content-table {
            min-width: 400px;
        }
    }

    @media screen and (min-width: 960px) and (max-width: 1904px) {
        .content-table {
            min-width: 900px;
        }
    }

</style>
