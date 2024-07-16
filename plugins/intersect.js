import Vue from 'vue'
import { VIntersectComp, VIntersectDir } from 'v-intersect'
 
Vue.directive('intersect', VIntersectDir)
Vue.component('v-intersect', VIntersectComp)