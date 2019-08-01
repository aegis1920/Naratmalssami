<template>
    <div v-infinite-scroll="more"
        infinite-scroll-disabled="busy"
    >
        <v-layout mt-5 wrap>
            <table class="content-table">
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>조회수</th>
                        <th></th>
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
    limits: {
      type: Number,
      default: 4
    },
    loadMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      start: 0,
      end : 0,
      cur_user_id: '',
      boards: [],
      showBoards: [],
      busy: false,
    }
  },
  components: {
    Board
  },
  mounted() {
    this.getBoards();
    this.getUser();
    this.end += this.limits;
  },
  methods: {
     async getBoards() {
         this.boards = await FirebaseService.getBoards();
         this.showBoards = this.boards.splice(this.start, this.end);
     },
     getget() {
         this.boards = [];
         this.getBoards();
     },
    async getUser() {
        this.cur_user_id = FirebaseService.getUser();
    },
    loadMoreBoards() {
      this.limits += 2;
    },
    more() {
        this.busy = true
        this.start += 3;
        this.end += 3;
        this.showBoards.concat(this.boards.splice(this.start, this.end));
        console.log('moremoremore');
    }
  },
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
    }

    .content-table thead tr {
        background-color: #009879;
        color: #ffffff;
        text-align: left;
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
        border-bottom: 2px solid #009879;
    }

    @media screen and (min-width: 600px) and (max-width: 960px){
        .content-table {
            min-width: 580px;
        }
    }

    @media screen and (min-width: 960px) and (max-width: 1904px) {
        .content-table {
            min-width: 900px;
        }
    }

</style>
