<template>
<v-layout mt-5 wrap>

    <table class="content-table">
        <thead>
            <tr>
                <th>작성자</th>
                <th>제목</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            <Board v-for="board in boards"
                  :board="board"
                  :title="board.title"
                  :author="board.author"
                  :body ="board.body"
                  :boardViewCount ="board.boardViewCount"
            ></Board>
        </tbody>
    </table>



</v-layout>
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
      previewShow: false,
      board_title:'',
      board_body:'',
      board_author:'',
      board_doc_id:'',
      board_created_at:'',
      board_boardViewCount:0,
      board_imgSrc:'',
      pagination: {
          sortBy: 'index'
      },
      selected:[],
      search:'',
      isMobile: false,
      headers: [{
          text: 'index',
          align: 'center',
          sortable: false,
          value: 'index'
        },
        {
          text: '제목',
          value: 'title',
          align: 'center',
        },
        {
          text: '작성자',
          value: 'author',
          align: 'center',
        },
        {
          text: '작성일',
          value: 'created_at',
          align: 'center',
        },
        {
          text: '조회수',
          value: 'boardViewCount',
          align: 'center',
        }
      ],
      boards: []
    }
  },
  components: {
    Board
  },
  mounted() {
    this.getBoards()
  },
  methods: {
    async getBoards() {
      this.boards = await FirebaseService.getBoards();
    },
    loadMoreBoards() {
      this.limits += 2;
    },
    showBoard(title, body, author, doc_id, created_at, boardViewCount, imgSrc){
      this.previewShow = true;
      this.board_title = title,
      this.board_body = body,
      this.board_author = author,
      this.board_doc_id = doc_id,
      this.board_created_at = created_at,
      this.board_boardViewCount = boardViewCount,
      this.board_imgSrc = imgSrc
    },
    previewShowClose(){
      this.previewShow = false;
    },
    onResize() {
          if (window.innerWidth < 769)
            this.isMobile = true;
          else
            this.isMobile = false;
        },
        toggleAll() {
          if (this.selected.length) this.selected = []
          else this.selected = this.desserts.slice()
        },
        changeSort(column) {
          console.log(column);
          if (this.pagination.sortBy === column) {
            this.pagination.descending = !this.pagination.descending
          } else {
            this.pagination.sortBy = column
            this.pagination.descending = false
          }
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
