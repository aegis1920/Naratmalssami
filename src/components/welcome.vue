<style scoped>
.layout {
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: fixed;
}
.door-container {
  width: 50vw;
  height: 100vh;
}
.left-door-container{
  display: flex;
  flex-direction: row-reverse;
}
.right-door-container{
  display: flex;
  flex-direction: row;
}
.door-container > div {
  flex : 1;
  background-image: url('../assets/doorpattern.jpg');
  background-size: contain;
  background-repeat: repeat-x;
}
.door {
  height: 100vh;
}
.left-door {
  float: right;
  animation-name: leftopen;
  animation-duration: 2s;
}
.right-door {
  float: left;
  animation-name: rightopen;
  animation-duration: 2s;
}
@keyframes leftopen {
  0% {
    margin-right: 0;
  }
  100% {
    margin-right: 100%;
  }
}
@keyframes rightopen {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: 100%;
  }
}
</style>

<template>
  <v-layout>
  <div class="door-container left-door-container">
    <img class="left-door door" src="../assets/leftdoor.jpg" />
    <div > </div>
  </div>
  <div class="door-container right-door-container">
    <img class="right-door door" src="../assets/rightdoor.jpg" />
    <div> </div>
  </div>
</v-layout>
</template>
