<template>
  <table class="content-table">
    <thead>
      <tr>
        <th>사용자 이메일 주소</th>
        <th>권한</th>
        <th>수정</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="USER in userList" :key="USER.id">
        <td>{{USER.id}}</td>
        <td>
          <select v-model="USER.user_class" id="userClassSelect" style="cursor:pointer">
            <option value="administrator">관리자</option>
            <option value="member">팀원</option>
            <option value="guest">손님</option>
          </select>
        </td>
        <td>
          <button @click="updateUserInfo(USER)" style="cursor:pointer">
            <i class="far fa-edit"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import FirebaseService from "../services/FirebaseService";

export default {
  name: "UserList",
  data() {
    return {
      userList: []
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    async updateUserInfo(USER) {
      console.log(USER);

      await FirebaseService.updateUserInfo(USER).then(
        function(result) {
          this.getUserList();
        }.bind(this)
      );
    },
    async getUserList() {
      this.userList = await FirebaseService.getUserList();
      console.log(this.userList);
    }
  }
};
</script>
