<template>
  <div class="section">
		<div class="container is-fluid">
			<div class="field">
				<label for="name" class="label">Name</label>
				<div class="control">
					<input class="input" type="text" name="name" id="name" v-model="newCoin.name">
				</div>
			</div>
			<div class="field">
				<label for="quantity" class="label">Quantity</label>
				<div class="control">
					<input class="input" type="text" name="quantity" id="quantity" v-model="newCoin.quantity">
				</div>
			</div>
			<div class="field">
				<label for="price" class="label">Price</label>
				<div class="control">
					<input class="input" type="text" name="price" id="price" v-model="newCoin.price">
				</div>
			</div>
			<div class="field">
				<div class="control">
					<button class="button is-link" @click="addCoin">Add</button>
				</div>
			</div>
		</div>
		<div class="container is-fluid" id="app">
			<br>
			<div>
				<table class="table is-bordered is-striped is-narrow is-hoverable">
					<thead>
						<tr>
								<th v-for="heading in headings" :key="heading">{{ heading }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="coin in coins" :key="coin.id">
							<td>{{ coin.data().name }}</td>
							<td>{{ coin.data().quantity }}</td>
							<td>{{ coin.data().lastPrice }}</td>
							<td>{{ coin.data().lastValue }}</td>
							<td>
							{{ coin.data().currentPrice }}
							<button @click="showModal(coin)">Update</button>
							</td>
							<td>{{ coin.data().currentValue }}</td>
							<td>{{ coin.data().difference }}</td>
							<td>{{ coin.data().differencePercent }}</td>
						</tr>
					</tbody>
					</table>
				</div>
				<br>
				<div>
					<button class="button is-link" @click="refreshData">Refresh</button>
				</div>

				<div class="modal is-active" v-if="modal">
					<div class="modal-background"></div>
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title">{{ editCoin.name }}</p>
							<button @click="closeModal" class="delete" aria-label="close"></button>
						</header>
						<section class="modal-card-body">
							<!-- Content ... -->
							<div class="field">
								<div class="control">
									<input class="input" type="text" name="newPrice" id="newPrice" v-model="editCoin.currentPrice">
								</div>
							</div>
						</section>
						<footer class="modal-card-foot">
							<button @click="updatePrice" class="button is-success">Save changes</button>
							<button @click="closeModal" class="button">Cancel</button>
						</footer>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import db from '@/db'

export default {
  data() {
    return {
      modal: false,
      headings: [ 'Coin', 'Quantity', 'Last Price', 'Last Value', 'Current Price', 'Current Value', 'Difference', 'Difference %' ],
      coins: [],
			newPrice: '',
			coinPrice: '',
      newCoin: {
        name: '',
        quantity: '',
        price: ''
      },
      editCoin: {
        id: '',
				name: '',
				quantity: '',
				currentPrice: '',
				currentValue: '',
				difference: '',
				differencePercent: '',
				lastPrice: '',
				lastValue: ''
			},
			emptyCoin: {
        id: '',
				name: '',
				quantity: '',
				currentPrice: '',
				currentValue: '',
				difference: '',
				differencePercent: '',
				lastPrice: '',
				lastValue: ''
			}
    }
  },
  created() {
    this.loadCoinData()
  },
  methods: {
    loadCoinData() {
      db.collection('Coins').get()
      .then(querySnapshot => {
        querySnapshot.forEach(element => {
          this.coins.push(element)
        });
      })
    },
    addCoin() {
      const value = this.newCoin.quantity * this.newCoin.currentPrice
      // Add a new document with a generated id.
      db.collection("Coins").add({
          name: this.newCoin.name,
          quantity: this.newCoin.quantity,
          lastPrice: 0,
          lastValue: 0,
          currentPrice: this.newCoin.currentPrice,
          currentValue: value.toFixed(2),
          difference: 0,
          differencePercent: 0
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    },
    showModal(coin) {
			this.editCoin = {
				id: coin.id,
				name: coin.data().name,
				quantity: coin.data().quantity,
				currentPrice: coin.data().currentPrice,
				currentValue: coin.data().currentValue.toFixed(2),
				difference: coin.data().difference,
				differencePercent: coin.data().differencePercent,
				lastPrice: coin.data().lastPrice,
				lastValue: coin.data().lastValue
			}

			this.coinPrice = this.editCoin.currentPrice
      this.modal = true
    },
    updatePrice() {
      // var lastValue
      var coinRef = db.collection("Coins").doc(this.editCoin.id)
      
      return coinRef.update({
          currentPrice: this.editCoin.currentPrice,
          lastPrice: this.coinPrice
      })
      .then(() => {
        console.log('Successfully updated document.');
        this.getDifference()
        this.modal = false
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
    },
    getDifference() {
      
      
		},
		closeModal() {
			this.modal = false
			Object.assign(this.editCoin, this.emptyCoin)
			this.coinPrice = ''
		},
    refreshData() {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
button { cursor: pointer; }
.modal-content { background-color: white; }
.control { width: 15%; }
</style>
