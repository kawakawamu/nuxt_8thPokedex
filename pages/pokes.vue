<template>
  <div>
    <div>
      <li v-for="(pokemon, index) in reversePokemons" :key="index" class="c-liststyle">
        <p>{{ pokemon.name }}</p>
      </li>
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
        let pokemons = {};
        let sortOrders = {};
        Object.keys(pokemons).forEach(function (key) {
            sortOrders[key] = 1
        });

        return {
            pokemons: pokemons,
            tasks: [],
            sortKey: '',
            sortOrders: sortOrders
        }
    },
    computed: {
      reversePokemons() {
        return this.pokemons.slice().reverse();
      }
    }
  }
</script>
<style>
  .c-liststyle {
    list-style: none;
  }
</style>
