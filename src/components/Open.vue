<template>
<div>
<router-link to="/"><i class="far fa-3x fa-arrow-alt-circle-left"></i></router-link>
    <div class="open-container container">
    <div>
    <h3>ФИО:</h3>
    <input required v-model="currentTodo['name']" class="form-control">
    </div>
    <div>
    <h3>Должность:</h3>
    <select v-model="currentTodo['role']" class="form-control">
      <option disabled value="">Сорт по роли</option>
           <option v-for="role in this.$store.state.roles" v-translate
            class="todo"
            :key="role.id"
            :value="role">
              {{ t(role) }}
           </option> 
    </select>
    </div>
    <div>
    <h3>Номер телефона:</h3>
    <masked-input   type="text"
      name="phone"
      class="form-control"
      :mask="['+','7','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
      :guide="false"
      placeholderChar="#" required v-model="currentTodo['phone']"></masked-input>
    </div>
    <div>
    <h3>Дата рождения:</h3>
    <masked-input   type="text"
      name="phone"
      class="form-control"
      :guide="false"
      :mask="[ /[0-9]/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]"
      placeholderChar="#" required v-model="currentTodo['birthday']"></masked-input>
    </div>
    <div class="is-arch">
      <input type="checkbox" required v-model="currentTodo['isArchive']" class="form-control">
      <h3>В архиве:</h3>
    </div>
    <div>
    <button :disabled="this.$store.state.disabled" type="send" @click="editTodo()">
      сохранить изменения
    </button>
    </div>
    </div>
</div>
</template>
<script>

import MaskedInput from 'vue-text-mask'

export default {
  
  name: 'Open',
  components: {
      MaskedInput
  },
  data: function() {
    return {
      alert: false,
    }
  },
  created: function() {
    this.$store.dispatch('loadTodos')
  },
  locales: {
        rus: {
            'waiter': 'Официант',
            'cook': 'Повар',
            'driver': 'Водитель'

        }
  },

  mounted: function() {
    this.$translate.setLang('rus');

  },
  
  methods: {
    editTodo() {
      this.$store.dispatch('editTodo')
      this.alert = true
      setTimeout(()=>{
        this.alert = false
      },3000)

      
    }
    
  },
  computed: {
    currentTodo () {
      if (this.$store.state.currentTodo == undefined){
        const string = localStorage.getItem('currentTodo');
        const data = JSON.parse(string);
        this.$store.state.currentTodo = data
        return data
      }
      else{
        const string = JSON.stringify(this.$store.state.currentTodo);
        localStorage.setItem('currentTodo', string);
        return this.$store.state.currentTodo
      }
      this.$store.state.currentTodo = currentTodo
    }
  }
  
    
}
</script>
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.todo-list{
  display: flex;
  flex-direction: column;
}
.todo .view{
  display: flex;
}
a.router-link-active{
  white-space: pre-line;
  word-break: break-all;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-size: 24px;
  position: absolute;
  top: 35px;
  left: 35px;
}
.open-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  position: relative;
  background: white;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
  margin-bottom: 60px;
  display:grid;
  width: 600px;
  div.is-arch{
        display: flex;
        justify-content: center;
        align-items: center;
        input[type="checkbox"]{
          width:50px;
          order: 2;
          cursor: pointer;
        }
  }
  div{
  padding: 20px 0;
  width:100%;
    h3{
      text-align:left;
    }
  }
}

button{
      text-decoration: none;
    color: #fff;
    background-color: #26a69a;
    text-align: center;
    letter-spacing: .5px;
    -webkit-transition: .2s ease-out;
    transition: .2s ease-out;
    cursor: pointer;
    border: none;
    border-radius: 2px;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    padding: 0 2rem;
    text-transform: uppercase;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    font-size: 1rem;
    outline: 0;
    height: auto;
}
@media only screen and (max-width:767px){
  .open-container{
    width:100%;
  }
  a.router-link-active{
    top: 15px;
    left: 15px;
    .fa-3x{
      font-size:2em;
    }
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
