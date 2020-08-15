<template>
  <div class="l-container">
    <div class="l-table">
      <div class="l-table__header">
        <div @click="sortBy('no')" class="l-table__1">No.</div>
        <div @click="sortBy('name')" class="l-table__2">Pokemon</div>
        <div @click="sortBy('base_stats')" class="l-table__3">Attack</div>
        <div @click="sortBy('base_stats')" class="l-table__4">Defense</div>
      </div>
      <div class="l-table__container">
        <transition-group name="flip-list">
          <tr v-for="pokemon in sortedPokemons" :key="pokemon.name" class="c-liststyle">
              <td class="l-table__1">{{ pokemon.no }}</td>
              <td class="l-table__2">{{ pokemon.name }}</td>
              <td class="l-table__3">{{ pokemon.base_stats[0] }}</td>
              <td class="l-table__4">{{ pokemon.base_stats[1] }}</td>
          </tr>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
  const axios = require('axios')
  const url = 'https://raw.githubusercontent.com/dayu282/pokemon-data.json/master/jp/gen8-jp.json'

  export default {
    asyncData({ params, error }) {
      return axios
        .get(url)
        .then((responce) =>{
            return { pokemons: responce.data }
        })
        .catch((e) =>{
            error ({ pokemons: e.responce.status, message: 'error'})
        })
    },
    data: function() {
      return {
        sort: {
          key: '',
          isAsc: false
        }
      }
    },
    computed: {
      sortedPokemons: function() {
        const data = this.pokemons.slice();
        if(!!this.sort.key) {
          data.sort((a,b) => {
            a = a[this.sort.key]
            b = b[this.sort.key]

            return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
          });
        }
        return　data;
      }
    },
    methods: {
      sortedClass (key) {
        return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : '';
      },
      sortBy (key) {
        this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
        this.sort.key = key;
      }
    }
  }
</script>
<style>
  .flip-list-move {
    transition: transform 1s;
  }

</style>
