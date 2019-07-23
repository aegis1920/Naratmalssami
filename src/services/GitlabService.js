import Api from '@/services/Api'

const BASE_URL = 'https://lab.ssafy.com/api/v4';


export default {
	getRepos(userName, privateToken) {
		// console.log(userName, privateToken);
		return Api(BASE_URL).get(`/users/${userName}/projects?private_token=` + privateToken);
	},
	getCommits(fullName, privateToken) {
		let d = new Date()
		d.setMonth(d.getMonth() - 1)
		// console.log(fullName)
		return Api(BASE_URL).get(`/projects/${fullName}/repository/commits?private_token=` + privateToken);
	}
}
