<template>
    <v-container>
        <div class="mt-5" sytle="margin: auto;">
           <h2 class="text-xs-center" style="color: white"> 현재까지 <strong>{{boardList.length}} Boards </strong>, <strong>{{commentList.length}} Comments</strong>가 작성되었습니다. </h2>
        </div>
        <table class="content-table">
        <thead>
        <tr>
            <th>
                User Email
            </th>
            <th>
                User Class
            </th>
            <th>
                Edit
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="USER in userList">
            <td>{{USER.userEmail}}</td>
            <td><select v-model="USER.userClass" id="userClassSelect" style="cursor:pointer">
                <option value="administrator">관리자</option>
                <option value="member">팀원</option>
                <option value="guest">손님</option>
            </select>
            </td>
            <td>
                <button @click="updateUserInfo(USER)" style="cursor:pointer"> <i class="far fa-edit"></i>
                </button>
            </td>
        </tr>
        </tbody>
        </table>
    </v-container>
</template>

<script>
    import firebase from "firebase"

    const firestore = firebase.firestore();

    export default {
        name: "AdminPage",
        data() {
            return {
                columns: [
                    {
                        label: 'User Email',
                        field: 'userEmail',
                    },
                    {
                        label: 'User Class',
                        field: 'userClass',
                    },
                ],
                userList: [],
                boardList: [],
                commentList: [],
            }
        },
        components: {},
        methods: {
            updateUserInfo: function (USER) {
                var userRef = firestore.collection('users').doc(USER.userEmail);
                return userRef.update({
                    user_class: USER.userClass
                })
                    .then(function () {
                        console.log("Document successfully updated!");
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            },
        },
        created() {
            const data = this.$data;
            firestore.collection("users").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    data.userList.push({userEmail: doc.id, userClass: doc.data().user_class})
                });
            });
            firestore.collection("boards").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    data.boardList.push(doc.id)
                });
            });

            firestore.collection("comments").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    data.commentList.push(doc.id)
                });
            });
            console.log(data.userList)
            console.log(data.boardList)
            console.log(data.commentList)
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
    }

    .content-table thead tr {
        background-color: #009879;
        color: #ffffff;
        text-align: center;
        font-weight: bold;
    }

    .content-table th,
    .content-table td {
        padding: 12px 15px;
    }

    .content-table tbody tr {
        border-bottom: 1px solid #dddddd;
        background-color: white;
        text-align: center;
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
