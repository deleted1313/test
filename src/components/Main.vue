<template>
   <section class="todoapp container">
     <div class="container">
      <header class="header">
        <input class="new-todo form-control" 
          autofocus type="text" autocomplete="off"
          placeholder="Добавить нового сотрудника"
          :value="newTodo.name"
          @change="setNewTodo"
          @keyup.enter="addTodo"
          >
        <div class="sorts">
        <div>
        <button @click="sortedArray" class="form-control">По имени</button>
        </div>
        <div>
        <button @click="sortedArrayByDate" class="form-control">По дате рождения</button>
        </div>
        <div class="sort-check">
         <input id="check" type="checkbox" @change="sortedArrayByArch" class="form-control">
         <label for="check">В архиве</label>
        </div>
        <div>
         <select @change="sortedArrayByRole" v-model="selected" class="form-control">
           <option disabled value="">По должности</option>
           <option v-for="role in this.$store.state.roles" v-translate
            class="todo"
            :value="role"
            :key="role">
              {{ t(role) }}
           </option> 
         </select>
        </div>
        </div>
        <div>
    <button @click="clearSort" class="form-control">Очистить сортировки</button>
    </div>
        
 
      </header>
      <section class="main" v-show="this.$store.state.todos.length" v-cloak>
        <ul class="todo-list">
          <li v-for="todo in todos"
            class="todo"
            :key="todo.id"
            >
             <transition-group name="list-complete">
            <div class="view list-complete-item" :key="todo.birthday">
              <!-- <input class="toggle" type="checkbox" v-model="todo.isArchive" :key="todo.id"> -->
              <!-- <textarea :value="todo.name" @keyup.enter="edit(todo)"></textarea> -->
              <router-link :key="todo.id" to="open"><label class="todo-name" @click="currentTodo(todo)" :key="todo.name"><span>{{ todo.name }}</span></label></router-link><p class="todo-date">{{ todo.birthday }}</p><p class="todo-role">{{ t(todo.role) }}</p><p class="todo-arch">{{t(todo.isArchive)}}</p><p class="todo-phone">{{ todo.phone }}</p>
              <button :key="todo.birthday" class="destroy" @click="removeTodo(todo)"><i class="far fa-times-circle"></i></button>
            </div>
             </transition-group>
          </li>
          
        </ul>
      </section>
    </div>
    </section>
</template>

<script>
export default {
  name: 'Main',
  data: function() {
    return {
       selected: '',
    }
  },
  created: function() {
    this.$store.dispatch('loadTodos')
  },
  locales: {
        rus: {
            'waiter': 'Официант',
            'cook': 'Повар',
            'driver': 'Водитель',
            'true': 'В Архиве',
            'false': 'Работает'
        }
  },
  mounted: function() {
    this.$translate.setLang('rus');
  },
  computed: {
    newTodo () {
      return this.$store.getters.newTodo
    },
    todos() {
      return this.$store.getters.todos         
    },
  },
  methods: {
    setNewTodo (e) {
      this.$store.dispatch('setNewTodo', e.target.value)
    },
    currentTodo (todo) {
       this.$store.dispatch('currentTodo', todo)
    },
    addTodo (e) {
      e.target.value = ''
      this.$store.dispatch('addTodo')
      this.$store.dispatch('clearNewTodo')
    },

    removeTodo (todo) {
      this.$store.dispatch('removeTodo', todo)
    },
    edit(todo){
      this.$store.dispatch('editTodo', todo)
    },
    sortedArray() {
      if (this.$store.state.sortedByName == true){
        function compare(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
          return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase())
          return -1;
        return 0;
      }
      this.$store.state.sortedByName = false;
      return this.$store.state.todos.sort(compare);
      }
      if (this.$store.state.sortedByName == false) {
      function compare(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
          return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase())
          return 1;
        return 0;
       
      }
       this.$store.state.sortedByName = true;
      return this.$store.state.todos.sort(compare);
    }
    },
    sortedArrayByDate() {
    if (this.$store.state.sortedByDate == false) {
    this.$store.state.sortedByDate = true     //
    return this.$store.state.todos = _.orderBy(this.$store.state.todos,['birthdaytosort'], ['asc']);
    
    }
    if (this.$store.state.sortedByDate == true) {
      this.$store.state.sortedByDate = false
      return this.$store.state.todos = _.orderBy(this.$store.state.todos,['birthdaytosort'], ['desc']);
    
    }
    },
    sortedArrayByArch() {
      if (this.$store.state.sortedByArch == false) {
        
        this.$store.state.todos =  _.filter(this.$store.state.todos, 'isArchive');
        this.$store.state.sortedByArch = true

      } else 
      if (this.$store.state.sortedByArch == true) {
        
        this.$store.state.todos = this.$store.state.x
         this.$store.state.sortedByArch = false
      }
      
    },
    sortedArrayByRole() {
   
        this.$store.state.todos = this.$store.state.x
        this.$store.state.todos =  _.filter(this.$store.state.todos, ['role', this.selected]);
  
    
  },
  clearSort() {
      this.$store.state.todos = this.$store.state.x
      this.$store.state.todos = _.orderBy(this.$store.state.todos,['id'], ['asc']);
  }
  }
  
    
}
</script>

<style scoped lang="scss">
.green{
  background: #42b983;
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
  height:70px;
  p{
    margin: auto;
    font-size: 23px;
  }
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
p{
  margin-top:auto;
  margin-bottom:0rem;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.form-control:focus {
    box-shadow:none;
  }
.todo-list{
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding-bottom: 30px;
}
.todoapp{
  background: white;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
}
.todo{
  display:flex;
  span{
    width: 100%;
  }
  label{
    margin-top: 1rem;
    margin-bottom: 0;
  }
  .view{
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  margin:auto;
  margin-bottom: 1rem;
  button{
  background: none;
  border: none;
  margin-top: 1rem;
  cursor:pointer;
  }
  a{
  text-align:left;
  }
  .role{
  width: 100px;
}
.todo-name{
  width: 250px;
  cursor:pointer;
}
.todo-phone{
  width: 250px;
}
.todo-date{
  width: 150px;
}
.todo-role{
  width:100px;
}
.todo-arch{
  width:100px;
}
}
}



header{
      padding-top: 30px;
}
.sorts{
  display:flex;
  justify-content: space-between;
  div{
    justify-content: center;
    display: grid;
    input,button,select{
      cursor: pointer;
    }
    label{
      margin-bottom:0;
    }
  }
  div.sort-check{
    display:flex;
    align-items: center;
    input[type="checkbox"]{
      width:50px;
    }

  }
  .form-control{
    width:250px;
    text-align: left;
  }

}
@media only screen and (max-width:992px){
  header{
    .sorts{
      flex-direction: column;
      align-items: center;
      width:100%;
      div{
        display: flex;
        width: 100%;
      }
      div.sort-check{
        justify-content: flex-start;
      }
      .form-control{
        width: 100%;
      }
    }
  }
  @supports(display:grid){
    header{
    .sorts{
      grid-template-columns: 1fr 1fr;
    }
  }
  }
}
@media only screen and (max-width:767px){
header{
    .sorts{
      grid-template-columns: 1fr;
      margin: 21px 0 30px 0;
      div{
        display: flex;
        width: 100%;
      }
      div.sort-check{
        justify-content: flex-start;
      }
      .form-control{
        width: 100%;
      }
    }
  }
  .todo{
  .view{
    .todo-arch, .todo-phone, .todo-date{
      display: none;
    }
    .todo-name{
      width: 160px;
      margin-bottom: 0;
    }
  }
}
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
  .new-todo{
    display:none;
  }
  .sorts{
    margin:0;
    div{
      margin-bottom:10px;
    }
  }
@supports (display:grid){
  .new-todo{
    display:block;
  }
  .sorts{
  margin: 30px 0;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 23px;
  div{
    display: grid;
    label{
      margin-bottom:0;
    }
  }
  .form-control{
    width:250px;
    text-align: left;
  }
}
}
@media only screen and (max-width:500px){
  .container{
    display:flex;
    flex-direction: column;
    align-content: center;
  }
  .header{
    width:auto;
    margin:auto;
    align-self: center;
    .sorts{
    display:flex;
    max-width:250px;
  }
  }
  .todo{
  .view{
  .todo-role{
      display: none;
    }
    .todo-name{
      width: 60px;
    }
  }
}
}

</style>
