<template>
<v-layout mt-5 wrap>

    <Board class="ma-3"
    v-if="previewShow"
    :title="board_title"
    :body="board_body"
    :author="board_author"
    :doc_id="board_doc_id"
    :created_at="board_created_at"
    :boardViewCount="board_boardViewCount"
    :imgSrc="board_imgSrc"
    ></Board>

  <v-card style="margin:0 auto">

  <v-card-title>
    Board Service
    <v-spacer></v-spacer>
    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
  </v-card-title>
  <v-icon small right @click="previewShowClose">fas fa-times-circle</v-icon>

    <v-layout v-resize="onResize" column style="padding-top:56px">
      <v-data-table :headers="headers" :items="boards" :search="search" :pagination.sync="pagination" :hide-headers="isMobile" :class="{mobile: isMobile}">
        <template slot="items" slot-scope="props">
          <tr v-if="!isMobile" @click="showBoard(props.item.title, props.item.body, props.item.author, props.item.doc_id, props.item.created_at.toString().split('GMT')[0], props.item.boardViewCount,  props.item.img)">
            <td class="text-xs-center">{{ props.index+1 }}</td>
            <td class="text-xs-center">{{ props.item.title }}</td>
            <td class="text-xs-center">{{ props.item.author }}</td>
            <td class="text-xs-center">{{ props.item.created_at.toString().split('GMT')[0] }}</td>
            <td class="text-xs-center">{{ props.item.boardViewCount }}</td>
          </tr>
          <tr v-else @click="showBoard(props.item.title, props.item.body, props.item.author, props.item.doc_id, props.item.created_at.toString().split('GMT')[0], props.item.boardViewCount,  props.item.img)">
            <td>
              <ul class="flex-content">
                <li class="flex-item oneLine" data-label="index">{{ props.index+1 }}</li>
                <li class="flex-item oneLine" data-label="title">{{ props.item.title }}</li>
                <li class="flex-item oneLine" data-label="author">{{ props.item.author }}</li>
                <li class="flex-item oneLine" data-label="created_at">{{ props.item.created_at.toString().split('GMT')[0] }}</li>
                <li class="flex-item oneLine" data-label="boardViewCount">{{ props.item.boardViewCount }}</li>
              </ul>
            </td>
          </tr>
        </template>
        <template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
        </template>
      </v-data-table>
    </v-layout>

  </v-card>

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
      this.boards = await FirebaseService.getBoards()
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
.mw-700 {
  max-width: 700px;
  margin: auto;
}

.mobile {
   color: #333;
 }

 @media screen and (max-width: 768px) {
   .mobile table.v-table tr {
     max-width: 100%;
     position: relative;
     display: block;
   }

   .mobile table.v-table tr:nth-child(odd) {
     border-left: 6px solid deeppink;
   }

   .mobile table.v-table tr:nth-child(even) {
     border-left: 6px solid cyan;
   }

   .mobile table.v-table tr td {
     display: flex;
     width: 100%;
     border-bottom: 1px solid #f5f5f5;
     height: auto;
     padding: 10px;
   }

   .mobile table.v-table tr td ul li:before {
     content: attr(data-label);
     padding-right: .5em;
     text-align: left;
     display: block;
     color: #999;

   }
   .v-datatable__actions__select
   {
     width: 50%;
     margin: 0px;
     justify-content: flex-start;
   }
   .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
     background: transparent;
   }

 }
 .flex-content {
   padding: 0;
   margin: 0;
   list-style: none;
   display: flex;
   flex-wrap: wrap;
   width: 100%;
 }

 .flex-item {
   padding: 5px;
   width: 50%;
   height: 40px;
   font-weight: bold;
 }
th{
  text-align: center;
}
</style>
