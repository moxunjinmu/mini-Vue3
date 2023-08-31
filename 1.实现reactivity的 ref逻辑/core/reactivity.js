/*
 * @Author: moxun
 * @Date: 2023-08-31 17:27:33
 * @Description: 
 */
 export class dep {
   constructor (val) {
    this._val = val
    this._effects = new Set()
   }

   get value() {
    this.deep()
    return this._val
   }

   set value(newVal) {
    this._val = newVal
    this.notice()
   }

   deep() {
    if(currentEffect) {
      this._effects.add(currentEffect)
    }
   }

   notice() {
    this._effects.forEach((item) => {
      item()
    })
   }

 }

 let currentEffect = null

 export const watchEffect = (fn) => {
  currentEffect = fn;
  fn()
 }