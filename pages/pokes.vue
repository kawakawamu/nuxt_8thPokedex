<template>
  <div>
    <table>
      <tr>
        <th @click="sortBy('name')">ポケモン名</th>
        <li v-for="(pokemon, index) in reversePokemons" :key="index" class="c-liststyle">
          <p>{{ pokemon.name }}</p>
        </li>
      </tr>
    </table>
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
            key: ''.
            isAsc; false
          }
        }
    },
    computed: {
      sortedItems: function() {
        const data = this.pokemons.slice();
        if(!!this.sort.key) {
          data.sort((a,b) {


          a = a[this.sort.key]
          b = b[this.sort.key]

          return (a === b b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
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
  .c-liststyle {
    list-style: none;
  }
</style>
