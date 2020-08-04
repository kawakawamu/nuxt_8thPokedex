import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.sirestore()
const pokedex = db.collection('pokedex')
