<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { state } from './store';
import { updateElo } from './elo';

const pickTwoDistinctItems = () => {
  const pickFunction = Math.random() < 0.6 ? weightedRandomItem : randomItem; // 3/5 chance for weighted

  let firstItem = pickFunction();
  let secondItem = pickFunction();

  while (secondItem === firstItem) {
    secondItem = pickFunction();
  }

  return [firstItem, secondItem];
}

function randomItem() {
  const randomIndex = Math.floor(Math.random() * state.items.length);
  return state.items[randomIndex];
}

function weightedRandomItem() {
  // Calculate the total weight (i.e., sum of 'shownCount's)
  const totalWeight = state.items.reduce((acc, item) => acc + (1 / (item.shownCount + 1)), 0);

  // Generate a random number between 0 and the total weight
  let randomNum = Math.random() * totalWeight;

  // Find which item this random number corresponds to
  for (const item of state.items) {
    const itemWeight = 1 / (item.shownCount + 1);
    if (randomNum < itemWeight) {
      return item;
    }
    randomNum -= itemWeight;
  }

  // Fallback to return the last item if for some reason the loop doesn't catch it
  return state.items[state.items.length - 1];
}

const selectedItems = ref<any[]>(pickTwoDistinctItems());
const matchHistory = ref([]);
const matchCount = ref(0);

const chooseFavorite = (winner: any, loser: any) => {
  const [newWinnerElo, newLoserElo] = updateElo(winner.elo, loser.elo);
  winner.elo = newWinnerElo;
  loser.elo = newLoserElo;

  // Update match history and count
  matchHistory.value.push({ winner: winner.name, loser: loser.name });
  matchCount.value++;

  // Increment shown count for both winner and loser
  winner.shownCount++;
  loser.shownCount++;

  selectedItems.value = pickTwoDistinctItems();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'ArrowLeft') {
    chooseFavorite(selectedItems.value[0], selectedItems.value[1]);
  } else if (e.code === 'ArrowRight') {
    chooseFavorite(selectedItems.value[1], selectedItems.value[0]);
  }
};


</script>

<template>
  <div class="container">
    <!-- Rankings -->
    <div class="ranking">
      <h2>Current Rankings</h2>
      <ul>
        <li v-bind:key="item.id" v-for="item in state.items.sort((a, b) => b.elo - a.elo)">
          {{ item.name }} ({{ parseInt(item.shownCount) }}) - {{ parseInt(item.elo) }}
        </li>
      </ul>
    </div>

    <!-- Item Display -->
    <div class="fight-container">
      <div class="card" v-bind:key="item.id" v-for="item in selectedItems" @click="chooseFavorite(item, selectedItems.find(i => i !== item))">
<!--        <h2>{{ item.name }}</h2>-->
        <!-- <p>ELO: {{ parseInt(item.elo) }}</p> -->

        <img :src="require(`@/assets/${item.srcImg}`)" alt="item.name" style="width:100%;max-width:300px;">

        <p style="font-size:10pt">{{ item.description }}</p>
      </div>
      <div class="vs">VS</div>
    </div>
  </div>



  <div>
    <h2>Total Matches: {{ matchCount }}</h2>
    <h3>Match History:</h3>
    <ul>
      <li v-for="(match, index) in matchHistory" :key="index">
        {{ match.winner }} vs {{ match.loser }}
      </li>
    </ul>
  </div>
</template>



<style>

body {
  font-family: sans-serif;
  background-color: #f1f1f1;
  padding: 20px;
  margin: 0;
}

.container {
  display: flex;
  justify-content: space-between;
}

.ranking {
  width: 30%;
}

.fight-container {
  width: 60%;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.vs {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  font-weight: bold;
}

.card {
  flex: 1;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  margin: 25px;
  width: 350px;
}

.card:hover {
  background-color: #fff;
  box-shadow: 0 0 10px 3px green;
}
</style>