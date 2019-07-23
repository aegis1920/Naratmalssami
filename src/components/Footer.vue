<template>
  <v-footer
          height="auto"
  >
    <v-card
            class="flex"
            flat
            flex
    >
      <v-card-title class="py-1">
        <v-spacer></v-spacer>
        <Weather></Weather>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <Translate></Translate>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-actions class="grey darken-3 justify-space-between px-5">
        <v-spacer></v-spacer>
        <v-card-text style="width: auto; color: white;" class="pa-0 ml-3">&copy; 2019 — <strong> 321pancake</strong>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-card-text style="width: auto;" class="pa-0 mr-3">
          <v-btn
                  v-for="icon in icons"
                  :key="icon.icon"
                  class="mx-2 white--text"
                  :href="icon.link"
                  icon
          >
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" size="24px">{{ icon.icon }}</v-icon>
              </template>
              <span>{{icon.name}}으로 이동해보아요!
            <v-icon small color="#FDD835">far fa-grin-squint</v-icon>
          </span>
            </v-tooltip>
            <!-- <v-icon size="24px">{{ icon }}</v-icon> -->
          </v-btn>

        </v-card-text>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
  import Weather from '@/components/Weather'
  import Translate from '@/components/Translate.vue'

  export default {
    name: "Footer",
    components: {
      Weather,
      Translate
    },
    data: () => ({
      icons: [
        {
          icon: 'fab fa-github',
          link: 'https://github.com/321pancake',
          name: '깃허브'
        },
        {
          icon: 'fas fa-blog',
          link: 'http://mkl0819.github.io',
          name: '블로그'
        }
      ]
    }),
  }
</script>

<style scoped>

</style>
