<template>
  <div id="app" v-cloak>
    <div v-if="this.$store.state.alert" id="card-alert" class="card" :class="{'green': this.$store.state.green, 'red': this.$store.state.red}">
    <p><i class="mdi-navigation-check"></i> {{this.$store.state.flash}}</p>
    </div>
    <img src="./assets/main_logo_url.svg">
    <transition name="slide-fade" mode="out-in" appear>
    <router-view/>

    </transition>
  </div>
  
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
*{
  p,label:not(.todo-name) span,h3{
    cursor: default;
  }
}
.green{
  background: #42b983;
}
.red{
  background:#eb3b77 !important;
}
[v-cloak] {
    display: none;
}
.card{
  transition: box-shadow .25s;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  color:white;
  position: fixed;
  right: 8px;
  top: 8px;
  margin: 0;
  width:300px;
  display:flex;
  z-index:500;
  height:70px;
  p{
    margin: auto;
    font-size: 23px;
  }
}
ul{
  margin-bottom: 60px;
}
body{
  background-color: #3949ab;
}
img{
  width: 200px;
  margin: 0 auto;
  margin-left: -3.1em;
  margin-bottom: 60px;
}
#app {
  font-family: 'Open Sans Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
::-webkit-scrollbar-track
{
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	background-image: -webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)));
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
@media only screen and (max-width:500px){
  .card{
    width:150px;
    height:50px;
    p{
      font-size:18px;
    }
  }
  img{
    margin:0;
    margin-bottom:30px;
    width:100px;
  }
  #app{
    margin-top:30px;
  }
}
input:hover, input:hover::-webkit-input-placeholder, button:hover, select:hover, input[type="checkbox"]:hover~label, input[type="checkbox"]:hover~h3{
      color:#42b983;
      border-color:#42b983;
    }
input[type="checkbox"]:focus{
  box-shadow: none;
}
</style>
