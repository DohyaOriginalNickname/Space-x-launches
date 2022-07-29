<template>
  <div>
    <div class="grid-container">
      <div 
        v-for="category in categories" :key="category.id"
        :ref="el => {column[category.id] = el}"
        class="grid"  
        @drop="onDrop($event, category.id)"
        @dragenter="onDragEnter($event, category.id)"
        @dragleave="onDragLeave(category.id)"
        @dragover.prevent
      >
        <div class="title-column">
          <h2>{{category.title}}</h2>
        </div>
        
        <div v-if="category.id === 1">
          <div 
            v-for="item in items.filter(x => x.categoryId === category.id)" :key="item"
            class="card"
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
  </div>
</template>

<script>
import { ref, onBeforeUpdate } from 'vue'

export default {
  setup(){
    const column = ref([])
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
    
    function onDragStart(event,item){
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemId', item.id.toString())
    }

    function onDrop(event, categoryId) {
      const itemId = parseInt(event.dataTransfer.getData('itemId'))
      items.value = items.value.map(item => {
        if (categoryId === 1 && item.categoryId !== 1 || categoryId !== 1 && item.categoryId === 1){
          column.value[categoryId].style.backgroundColor = ''
          return item
        }
        if(item.id === itemId){
          column.value[categoryId].style.backgroundColor = ''
          item.categoryId = categoryId
        }
        return item
      })
    }

    function onDragEnter(event, ref) {
      event.preventDefault()
      if (ref === 1) {
        column.value[ref].style.backgroundColor = 'red'
      }else{
        column.value[ref].style.backgroundColor = 'green'
      }
    }

    function onDragLeave (ref) {
      if(column.value[ref].style.backgroundColor === 'red' || column.value[ref].style.backgroundColor === 'green'){
        column.value[ref].style.backgroundColor = ''
      }
    }

    return{
      column,
      items,
      categories,
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
</style>
