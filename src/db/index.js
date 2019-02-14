import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCINN7w-uf0IWYF45sE4OFwiLZgNQyzLbc',
  authDomain: 'crypto-calculator-ccf81.firebaseapp.com',
  databaseURL: 'https://crypto-calculator-ccf81.firebaseio.com',
  projectId: 'crypto-calculator-ccf81',
  storageBucket: 'crypto-calculator-ccf81.appspot.com',
  messagingSenderId: '653522734461'
};

const settings = {
  timestampsInSnapshots: true
}



const firebaseapp = firebase.initializeApp(config)
const firestore = firebaseapp.firestore()
firestore.settings(settings)

export default firestore