import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const POSTS = 'posts'
const BOARDS = 'boards'
const IMGBANNER = 'imgbanner'

// Setup Firebase
// const config = {
// 	projectId: 'elice-ssafy',
// 	authDomain: 'elice-ssafy.firebaseapp.com',
// 	apiKey: 'AIzaSyCax1KLYHHlLEoxNkRIW8efgUBWooyEB2Q',
// 	databaseURL: 'https://elice-ssafy.firebaseio.com',
// 	storageBucket: 'gs://elice-ssafy.appspot.com'
// }

const config = {
  apiKey: "AIzaSyC8aq7GouxjIjJGA7WGccNNCn1HhL8uCys",
  authDomain: "webmobile-sub2-730c1.firebaseapp.com",
  databaseURL: "https://webmobile-sub2-730c1.firebaseio.com",
  projectId: "webmobile-sub2-730c1",
  storageBucket: "gs://webmobile-sub2-730c1.appspot.com",
  messagingSenderId: "872601909524",
  appId: "1:872601909524:web:c157dfaa2515b947"
}

firebase.initializeApp(config);
const firestore = firebase.firestore();

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
    if(user !== null){
      let userEmail = user.email.split('@');
      let userId = userEmail[0];
      return firestore.collection(BOARDS).add({
        doc_id:firestore.collection(BOARDS).doc().id,
        boardViewCount:0,
        title,
        body,
        img,
        author:userId,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
    }else{
      alert("로그인을 하지 않으셨습니다. 로그인해주세요.")
    }
  },
  updateBoardViewCount(doc_id){
    firestore.collection(BOARDS).where('doc_id','==',doc_id)
    .get()
    .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        firestore.collection(BOARDS).doc(doc.id).update({
          boardViewCount:firebase.firestore.FieldValue.increment(1)
        });
      });
    })
  },
  updateViewPageCount(pagename){
		let user = firebase.auth().currentUser;
		if(user !== null){
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
      .then(function(doc){
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
	}
}
