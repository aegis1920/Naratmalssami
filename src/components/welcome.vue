<style scoped>
#body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  position: fixed;
}
section {
  height: 100vh;
  width: 100vw;
  background: #000;
  z-index: 3000;
  position: fixed;
}
section:before {
  content: '';
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #4A148C, #3949AB);
  mix-blend-mode: color;
  pointer-events: none;
}
video {
  /* margin: 0; */
  /* padding: 0; */
  /* position: absolute; */
  /* top: 50%; */
  /* transform: translateY(-50%); */
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
}
h1 {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  color: #ddd;
  font-size: 8vw;
  letter-spacing: 0.2em;
}

h1 span {
  font-family: Aladdin!important;
  opacity: 0;
  display: inline-block;
  animation: animate 1s linear forwards;
  -moz-animation: animate 1s linear forwards;
  -webkit-animation: animate 1s linear forwards;
  -o-animation: animate 1s linear forwards;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
    filter: blur(10px);
  }

  100% {
    opacity: 1;
    transform: rotateY(0deg);
    filter: blur(0);

  }
}
h1 span:nth-child(1){
  animation-delay: 1s;
}
h1 span:nth-child(2){
  animation-delay: 1.4s;
}
h1 span:nth-child(3){
  animation-delay: 1.8s;
}
h1 span:nth-child(4){
  animation-delay: 2.2s;
}
h1 span:nth-child(5){
  animation-delay: 2.6s;
}
h1 span:nth-child(6){
  animation-delay: 3s;
}
h1 span:nth-child(7){
  animation-delay: 3.4s;
}
h1 span:nth-child(8){
  animation-delay: 3.8s;
}
h1 span:nth-child(9){
  animation-delay: 4.2s;
}
</style>

<template>
<!-- <div id="body">? -->
  <section>
    <video src="../assets/smoke.mp4" autoplay muted></video>
    <h1>
      <!-- <span>W</span>
      <span>E</span>
      <span>L</span>
      <span>C</span>
      <span>O</span>
      <span>M</span>
      <span>E</span> -->
      <span>M</span>
      <span>A</span>
      <span>K</span>
      <span>E</span>
      <span>a</span>
      <span>W</span>
      <span>I</span>
      <span>S</span>
      <span>H</span>
    </h1>
  </section>
<!-- </div> -->
</template>
