import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const POSTS = 'posts'
const BOARDS = 'boards'
const IMGBANNER = 'imgbanner'

// const config = {
//   apiKey: "AIzaSyC8aq7GouxjIjJGA7WGccNNCn1HhL8uCys",
//   authDomain: "webmobile-sub2-730c1.firebaseapp.com",
//   databaseURL: "https://webmobile-sub2-730c1.firebaseio.com",
//   projectId: "webmobile-sub2-730c1",
//   storageBucket: "gs://webmobile-sub2-730c1.appspot.com",
//   messagingSenderId: "872601909524",
//   appId: "1:872601909524:web:c157dfaa2515b947"
// }

const config = {
  apiKey: "AIzaSyAZsR8WdjeUiFFwOLE2yVHosx9fxJfDwCc",
  authDomain: "naratmalssami-93474.firebaseapp.com",
  databaseURL: "https://naratmalssami-93474.firebaseio.com",
  projectId: "naratmalssami-93474",
  storageBucket: "naratmalssami-93474.appspot.com",
  messagingSenderId: "725896696284",
  appId: "1:725896696284:web:236449358c0edc3d"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const messaging = firebase.messaging();

export default {
  getBoards() {
    const postsCollection = firestore.collection(BOARDS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
  },
  postBoard(title, body, img) {
    let user = firebase.auth().currentUser;
    if (user !== null) {
      let userEmail = user.email.split('@');
      let userId = userEmail[0];
      return firestore.collection(BOARDS).add({
        doc_id: firestore.collection(BOARDS).doc().id,
        boardViewCount: 0,
        title,
        body,
        img,
        author: userId,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
    } else {
      alert("로그인을 하지 않으셨습니다. 로그인해주세요.")
    }
  },
  updateBoardViewCount(doc_id) {
    firestore.collection(BOARDS).where('doc_id', '==', doc_id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          firestore.collection(BOARDS).doc(doc.id).update({
            boardViewCount: firebase.firestore.FieldValue.increment(1)
          });
        });
      })
  },
  updateViewPageCount(pagename) {
    let user = firebase.auth().currentUser;
    if (user !== null) {
      let userEmail = user.email;
      let currentUserRef = firestore.collection('users').doc(userEmail);
      currentUserRef.update({
        [pagename]: firebase.firestore.FieldValue.increment(1)
      })
    }
  },
  getImgUrl(pagename) {
    const imgCollection = firestore.collection(IMGBANNER)
    return imgCollection.doc(pagename).get()
      .then(function(doc) {
        return doc.data()
      })
  },
  updateImgUrl(pagename, imgurl) {
    const imgCollection = firestore.collection(IMGBANNER)
    return imgCollection.doc(pagename).set({
        imgurl: imgurl
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  },
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      let accessToken = result.credential.accessToken
      let user = result.user
      return result
    }).catch(function(error) {
      console.error('[Google Login Error]', error)
    })
  },
  notificationService() {
    messaging
      .requestPermission()
      .then(function() {
        console.log("Notification permission granted.");
        return messaging.getToken()
      })
      .then(function(token) {
        console.log("token is : " + token);
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });
  },
  getUserMessageList(){
		let userEmail = firebase.auth().currentUser.email;
		if(userEmail !== null){
			let currentUserRef = firestore.collection('users').doc(userEmail);
      return currentUserRef.get().then(function(doc){
        return doc.data().messageList;
      })
    }
  },
  setUserMessageList(messageList){
		let userEmail = firebase.auth().currentUser.email;
		if(userEmail !== null){
			let currentUserRef = firestore.collection('users').doc(userEmail);
      currentUserRef.update({
        messageList: messageList
      })
    }
  }
}
