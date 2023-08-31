/*
 * @Author: moxun
 * @Date: 2023-08-31 17:27:27
 * @Description: 
 */
import { dep, watchEffect } from "./core/index.js";

let a =  new dep(10);
let b = 0

watchEffect(() => {
  b = a.value + 10;
  console.log('b', b);
})
a.value = 20