import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'Vuex'
import Promise from 'promise-polyfill';
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import VueTranslate from 'vue-translate-plugin'
import MaskedInput from 'vue-text-mask'
import Fetch from 'fetch-ie8'
Vue.use(VueLodash, lodash)
Vue.use(VueTranslate)
Vue.use(Vuex)

Vue.config.productionTip = false
/* eslint-disable no-new */
if (!window.Promise) {
  window.Promise = Promise;
}
if (!window.fetch) {
  window.fetch = Fetch
}
function randomId () {
  return Math.random()
    .toString()
    .substr(2, 10)
}
Vue.component('masked-input', MaskedInput);
const store = new Vuex.Store({
  state: {
    loading: true,
    todos: [],
    newTodo: '',
    currentTodo: this.currentTodo,
    sortedByName: false,
    sortedByDate: false,
    sortedByArch: false,
    sortedByRole: false,
    alert: false,
    green: false,
    red: false,
    disabled: false,
    x:this.todos,
    roles:[]
  },
  getters: {
    newTodo: state => state.newTodo,
    todos: state => state.todos,
    currentTodo: state => state.currentTodo
  },
  mutations: {
    SET_LOADING (state, flag) {
      state.loading = flag
    },
    CURRENT_TODO(state, todo) {
      state.currentTodo = todo
    },

    SET_TODOS (state, todos) {
      state.todos = todos
    },
    SET_NEW_TODO (state, todo) {
      state.newTodo = todo
    },
    ADD_TODO (state, todoObject) {
      state.todos.push(todoObject)
    },
    EDIT_TODO(state, todo, currentTodo){
      state.todo = state.currentTodo  
   },
    
    REMOVE_TODO (state, todo) {
      var todos = state.todos
      todos.splice(todos.indexOf(todo), 1)
    },
    CLEAR_NEW_TODO (state) {
      state.newTodo = ''
    }
 },
 actions: {
    loadTodos ({ commit, state }) {
      state.disabled = false
      commit('SET_LOADING', true)  
      axios
        .get('http://localhost:3000/users')

        .then(r => r.data)
        .then(todos => {
          commit('SET_TODOS', todos)
          commit('SET_LOADING', false)
          for (let i = 0;i<state.todos.length; i++) {
            state.todos[i].birthday = state.todos[i].birthday.replace('.', '-').replace('.','-')
            const getDateA = state.todos[i].birthday.split('-')
            state.todos[i].birthdaytosort = new Date(getDateA[2], getDateA[1], getDateA[0])
            state.roles.push(todos[i].role)
         }
         state.roles = _.uniq(state.roles)
         state.x = todos
        })
    },
    setNewTodo ({ commit }, todo) {
      commit('SET_NEW_TODO', todo)
    },
    editTodo({commit, state}, todos,todo){
        for(let i = 0; i<this.state.todos.length;i++){
          let name = state.todos[i]['name'].replace(/[\s{2,}]+/g, ' ').toLowerCase()
          let todoname = state.currentTodo['name'].replace(/[\s{2,}]+/g, ' ').toLowerCase()
          if ((name == todoname)
           && (state.todos[i]['phone'].replace(' ', '').replace(' ', '') == state.currentTodo['phone'].replace(' ', '').replace(' ', ''))
           && (state.todos[i]['role'] == state.currentTodo['role']) 
           && (state.todos[i]['birthday'].replace('.', '-').replace('.','-') == state.currentTodo['birthday'].replace('.', '-').replace('.','-'))
           && (state.todos[i]['isArchive'] == state.currentTodo['isArchive'])){
            state.alert = true
            state.green = false
            state.red = true
            state.flash = 'Пожалуйста, внесите изменения'
            setTimeout(function(){state.alert = false}, 3000)
            return
          }
          if (state.currentTodo['id'] == state.todos[i]['id']){
            fetch(`http://localhost:3000/users/${state.currentTodo['id']}`, {
              method: 'put',
              body: JSON.stringify(state.currentTodo),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).then((response)=> {
              commit('EDIT_TODO', JSON.stringify(state.currentTodo))
            })
          }
        }
        state.disabled = true
        state.red = false
        state.alert = true
        state.green = true
        state.flash = 'ОТЛИЧНО: Данные изменены!'
        setTimeout(()=>{
          state.alert = false
      },3000) 
  },
    addTodo ({ commit, state },todos) {
      if (!state.newTodo) {
        return
      }
      const todo = {
        name: state.newTodo,
        isArchive: false,
        id: randomId(),
        birthday: '10.10.1999',
        phone: '+7(999) 999-9999',
        role: 'driver'
      }
      for (let i=0; i< state.todos.length; i++){
        let name = state.todos[i]['name'].replace(/[\s{2,}]+/g, ' ').toLowerCase()
        let todoname = todo['name'].replace(/[\s{2,}]+/g, ' ').toLowerCase()
        if (name.indexOf(todoname)!=-1 ){
          state.red = true
          state.alert = true
          state.green = false
          state.flash = 'Такой человек уже есть в списке'
          setTimeout(()=>{
            state.alert = false
        },3000) 
          return
        }
      }
      
      axios.post('http://localhost:3000/users', todo).then(_ => {
        
        commit('ADD_TODO', todo)
      })
      state.red = false
      state.alert = true
      state.green = true
      state.flash = 'ОТЛИЧНО: Сотрудник добавлен!'
      setTimeout(()=>{
        state.alert = false
    },3000) 
      
    },
    removeTodo ({ commit, state }, todo) {
      state.alert = true
      state.red = false
      state.red = true
      state.flash = 'Сотрудник удален!'
      setTimeout(()=>{
        state.alert = false
    },3000) 
      axios.delete(`http://localhost:3000/users/${todo.id}`).then(_ => {
        commit('REMOVE_TODO', todo)
      })
    },
    currentTodo ({ commit, state }, todo) {
      commit('CURRENT_TODO', todo)
    },
    clearNewTodo ({ commit }) {
      commit('CLEAR_NEW_TODO')
    }
  }

})
const app = new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // load todos on start
  created: function() {
    this.$store.dispatch('loadTodos')
  },
  // be able to get the data
  computed: {
    newTodo () {
      return this.$store.getters.newTodo
    },
    todos () {
      return this.$store.getters.todos
    },
    currentTodo () {
      
      return this.$store.getters.currentTodo

    }
  },
  methods: {
    setNewTodo (e) {
      this.$store.dispatch('setNewTodo', e.target.value)
    },

    addTodo (e) {
      e.target.value = ''
      this.$store.dispatch('addTodo')
      this.$store.dispatch('clearNewTodo')
    },

    removeTodo (todo) {
      this.$store.dispatch('removeTodo', todo)
    },
    currentTodo (todos, e) {
      this.$store.dispatch('currentTodo',todo)
   },
  }
})


