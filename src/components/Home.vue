<template>
  <div>
    <div class="grid-container">
      <div 
        v-for="category in categories" :key="category.id"
        :ref="el => {column[category.id] = el}"
        class="grid"  
        @drop="onDrop($event, category.id, items, column, snackbar)"
        @dragenter="onDragEnter($event, category.id, column)"
        @dragleave="onDragLeave(category.id, column)"
        @dragover.prevent
      >
        <div class="title-column">
          <h2>{{category.title}}</h2>
        </div>
        
        <div v-if="category.id === 1">
          <div 
            v-for="item in items.filter(x => x.categoryId === category.id)" :key="item"
            class="card"
            @dragstart.prevent
          >
            <div class="card__title">
              <p>{{item.title}}</p>
            </div>
            <div class="card__time">
              <p>{{item.date}}</p>
            </div>
            <div class="card__description">
              <p>{{item.description}}</p>
            </div>  
          </div>
        </div>
        <div v-else>
          <div
            v-for="item in items.filter(x => x.categoryId === category.id)" :key="item"
            class="card"
            @dragstart="onDragStart($event, item)" 
            draggable="true" 
          >
            <div class="card__title">
              <p>{{item.title}}</p>
            </div>
            <div class="card__time">
              <p>{{item.date}}</p>
            </div>
            <div class="card__description">
              <p>{{item.description}}</p>
            </div>  
          </div>
        </div>
      </div>
    </div>

    <div class="snackbar" ref="snackbar">
      <p>
        Событие успешно добавлено!
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUpdate } from 'vue'
import onDragStart from './main events/onDragStart'
import onDrop from './main events/onDrop'
import onDragEnter from './main events/onDragEnter'
import onDragLeave from './main events/onDragLeave'

export default {
  setup(){
    const column = ref([])
    const snackbar = ref('')

    onBeforeUpdate(() => {
      column.value = []
    })

    const items = ref([
      {
        id:1,
        title:'xXx_$koLYAN$1',
        date:'12.34.5.6.7 pipipipi aam',
        description:'lobac?????? 1000-7777777777777777777777777777777777777 zxc gulya ya ebal',
        categoryId: 1
      },
      {
        id:2,
        title:'xXx_$koLYAN$2',
        date:'12.34.5.6 pipipipi aam',
        description:'lobac?????? 1000-7777777777777777777777777777777777777 zxc gulya ya ebal',
        categoryId: 1
      },
      {
        id:3,
        title:'xXx_$koLYAN$3',
        date:'12.34.5.6. 11111:30:42141 pipipipi aam',
        description:'lobac?????? 1000-7777777777777777777777777777777777777 zxc gulya ya ebal',
        categoryId: 2
      },
      {
        id:4,
        title:'xXx_$koLYAN$3',
        date:'12.34.5.6. 11111:30:42141 pipipipi aam',
        description:'lobac?????? 1000-7777777777777777777777777777777777777 zxc gulya ya ebal',
        categoryId: 2
      },
    ])
    const categories = ref([
      {
        id:1,
        title:'Past Launches',
      },
      {
        id:2,
        title:'Next Launches'
      },
      {
        id:3,
        title:'My Launches'
      }
    ])
    return{
      column,
      items,
      categories,
      snackbar,
      onDrop,
      onDragStart,
      onDragEnter,
      onDragLeave
    }
  }
}
</script>

<style scoped lang="scss">
.grid-container{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  .grid{
    .card{
      background-color: rgb(255, 255, 255);
      border-radius: 4px;
      margin: 10px;
      padding: 10px;
      .card__title{
        font-size: 24px;
        text-decoration: underline;
        margin-bottom: 5px;
      }
      .card__time{
        font-size: 18px;
        color: rgba(0, 0, 0, 0.6);
        letter-spacing: 0.8px;
        margin-bottom: 15px;
      }
      .card__description{
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
        letter-spacing: 0.4px;
      }
    }
    .title-column{
      font-size: 32px;
      padding: 10px 0 0 10px;
    }
  }
}

.snackbar{
  visibility: hidden; 
  min-width: 250px; 
  background-color: white; 
  color: black; 
  text-align: center; 
  padding: 16px; 
  position: fixed; 
  z-index: 1; 
  left: calc(50% - 250px/2); 
  bottom: 30px; 
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(11, 26, 34, 0.12);
  border-radius: 8px;
}

.show {
  visibility: visible;
  animation: fadein .6s, fadeout 0.8s 1.5s;
}
@keyframes fadein {
  from { opacity: 0;}
  to {opacity: 1;}
}
@keyframes fadeout {
  from { opacity: 1;}
  to { opacity: 0;}
}
</style>
