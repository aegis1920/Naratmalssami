<template>
  <v-layout column px-4>
    <v-flex v-for="i in repositories.length > limits ? limits : repositories.length" xs12 sm6 md4 lg3>
      <v-divider v-if="i === 1"></v-divider>
      <Repository
              :repos="repositories[i - 1]"
              :token="token"
      ></Repository>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import Repository from '@/components/Repository'
import GitlabService from '@/services/GitlabService'

export default {
	name: 'RepositoryList',
	props: {
		limits: {type: Number, default: 5},
		loadMore: {type: Boolean, default: false},
        token: {type: String},
        userName: {type: String},
	},
	data() {
		return {
			repositories: []
    }
	},
	components: {
		Repository
	},
	mounted() {
		this.getGitlabRepos(this.userName, this.token);
		console.log(this.repositories);
	},
	methods: {
		async getGitlabRepos(userName, token) {
			const response = await GitlabService.getRepos(userName, token)
			if(response.status !== 200) {
				return
			}

			this.repositories = response.data
		}
	}
}
</script>
