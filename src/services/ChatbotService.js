 const text= [
   {
     keywords: ['안녕', '하이', '헬로우', '헬로', 'ㅎㅇ', 'hi', 'Hi', 'hello'],
     answer: ['안녕하세요', '반가워요']
   },
   {
     keywords: ['가입', 'register'],
     answer: ['가입하지마세요']
   },
   {
     keywords: ['글쓰기', 'write', '작성'],
     answer: ['글쓰지마요']
   },
 ];

 export default {
   getAnswer(userText){
     var keywords = [];
     var answers = [];
     var length = 0;
     for(var i in text){
       keywords = text[i].keywords;
       for(var k in keywords){
         if(userText.includes(keywords[k])){
           answers = text[i].answer;
           length = answers.length;
           console.log(length);
           if(length==1){
             return answers[0];
           } else{
             return answers[Math.floor(Math.random()*length)];
           }
         }
       }
     }
     return '좀 더 정확히 말해주세요'
   }

 }
