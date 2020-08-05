import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'
import { firestore } from 'firebase'

const db = firebase.sirestore()
const pokesRef = db.collection('pokedex')

export const state = () => ({
  pokedex: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('pokedex', pokesRef)
  }),
  add: firestoreAction((context, name) => {
    if (name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    pokesRef.doc(id).delete()
  }),
  toggle: firestoreAction((context, poke) => {
    pokesRef.doc(poke.id).update({
      done: !poke.done
    })
  })
}
