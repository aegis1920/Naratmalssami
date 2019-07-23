<template>
<v-layout py-4 h-100>
  <v-dialog >
  <!-- <v-dialog v-model="dialog"> -->
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark >Open Dialog</v-btn> -->
      <v-hover>

        <v-flex row v-on="on" slot-scope="{ hover }" class="mx-auto" style="cursor:pointer">
          <div class="caption">{{formatedDate}}</div>
          <h2 class="color-333 headline font-weight-light">{{title}}</h2>
          <p class="mb-1 color-666 font-weight-light subheading body-txt">{{body}}</p>
        </v-flex>

      </v-hover>
    </template>

    <!-- <v-flex xs12 sm8 md6> -->
    <v-card >
      <v-card-title primary-title hover>
        <div>
          <div class="caption">{{formatedDate}}</div>
          <h2 class="color-333 headline font-weight-light">{{title}}</h2>
          <p class="mb-1 color-666 font-weight-light subheading">

            {{body}}</p>
        </div>
      </v-card-title>
    </v-card>
  <!-- </v-flex> -->
  </v-dialog>



</v-layout>
</template>

<script>
export default {
  name: 'Post',
  props: {
    date: {
      type: Date
    },
    title: {
      type: String
    },
    body: {
      type: String
    }
  },
  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`
    }
  }
}
</script>
<style>
.color-666 {
  color: #666;
}

.color-333 {
  color: #333;
}

.h-100 {
  height: 100%;
}
</style>
