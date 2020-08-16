<template>
  <div class="l-container">
    <div class="c-font__title">
      <h2>8th generation Pokemon Data</h2>
    </div>
    <div class="c-textbox__serch">
      <input type="text" v-model="keyword" placeholder="serch Pokemon name...">
    </div>
    <div class="l-table">
      <div class="l-table__header c-titlestyle">
        <div @click="sortBy('no')" class="l-table__1"
             :class="sortedClass('no')">No.</div>
        <div @click="sortBy('name')" class="l-table__2"
             :class="sortedClass('name')">Pokemon</div>
        <div @click="sortBy('hp')" class="l-table__3"
             :class="sortedClass('hp')">HP</div>
        <div @click="sortBy('attack')" class="l-table__3"
             :class="sortedClass('attack')">Attack</div>
        <div @click="sortBy('defense')" class="l-table__3"
             :class="sortedClass('defense')">Defense</div>
        <div @click="sortBy('sp_attack')" class="l-table__3"
             :class="sortedClass('sp_attack')">SP_Attack</div>
        <div @click="sortBy('sp_defense')" class="l-table__3"
             :class="sortedClass('sp_defense')">SP_Defense</div>
        <div @click="sortBy('speed')" class="l-table__3"
             :class="sortedClass('speed')">Speed</div>
      </div>
      <div class="l-table__container">
        <transition-group name="serch-list" tag="div">
        <div v-for="pokemon in filteredPokemons" :key="pokemon.name" class="c-listserch">
              <div class="l-table__1 c-serchresult">{{ pokemon.no }}</div>
              <div class="l-table__2">{{ pokemon.name }}</div>
              <div class="l-table__3">{{ pokemon.hp }}</div>
              <div class="l-table__3">{{ pokemon.attack }}</div>
              <div class="l-table__3">{{ pokemon.defense }}</div>
              <div class="l-table__3">{{ pokemon.sp_attack }}</div>
              <div class="l-table__3">{{ pokemon.sp_defense }}</div>
              <div class="l-table__3">{{ pokemon.speed }}</div>
        </div>
        </transition-group>
        <transition-group name="flip-list" tag="div">
          <div v-for="pokemon in sortedPokemons" :key="pokemon.name" class="c-liststyle">
              <div class="l-table__1">{{ pokemon.no }}</div>
              <div class="l-table__2">{{ pokemon.name }}</div>
              <div class="l-table__3">{{ pokemon.base_stats[0] }}</div>
              <div class="l-table__3">{{ pokemon.base_stats[1] }}</div>
              <div class="l-table__3">{{ pokemon.base_stats[2] }}</div>
              <div class="l-table__3">{{ pokemon.base_stats[3] }}</div>
              <div class="l-table__3">{{ pokemon.base_stats[4] }}</div>
              <div class="l-table__3">{{ pokemon.base_stats[5] }}</div>
          </div>
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
        },
        keyword: '',
      }
    },
    computed: {
      sortedPokemons: function() {
        const data = this.pokemons.slice();

        this.pokemons.forEach(function(value){
         value["hp"] = value["base_stats"][0];
         value["attack"] = value["base_stats"][1];
         value["defense"] = value["base_stats"][2];
         value["sp_attack"] = value["base_stats"][3];
         value["sp_defense"] = value["base_stats"][4];
         value["speed"] = value["base_stats"][5];
        })

        if(!!this.sort.key) {
          data.sort((a,b) => {
            a = a[this.sort.key]
            b = b[this.sort.key]

            return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
          });
        }
        return　data;
      },
      filteredPokemons: function() {

        let xxxxx = this.pokemons.map(pokemon =>
        　({
          　no: pokemon.no,
            name: pokemon.name,
            hp: pokemon.base_stats[0],
            attack: pokemon.base_stats[1],
            defense: pokemon.base_stats[2],
            sp_attack: pokemon.base_stats[3],
            sp_defense: pokemon.base_stats[4],
            speed: pokemon.base_stats[5],
          })
        );

        let filterWord = this.keyword && this.keyword.toLowerCase();

        if(filterWord) {
            xxxxx = xxxxx.filter(function (row) {
                return Object.keys(row).some(function (key) {
                    return String(row[key]).toLowerCase().indexOf(filterWord) > -1
                })
            })
        }else{
          xxxxx = "";
        }
        return xxxxx;
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

  .serch-list-leave-active,
  .serch-list-enter-active {
      transition: opacity .5s, transform .5s ease;
  }
  .serch-list-leave-to,
  .serch-list-enter {
      opacity: 0;
      transform: translateX(50px);
  }
  .serch-list-leave,
  .serch-list-enter-to {
      opacity: 1;
  }
  .serch-list-move {
      transition: transform .5s;
  }

</style>
