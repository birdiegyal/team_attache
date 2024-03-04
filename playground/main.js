const url = "?$id=adf34f345j32212jk3jk43&secret=kjkdjfksjf23j42k2h42hk2352lk43klnkn52klj123kj2kln423n4kl1n3kl123k13kl13242jk4jk24j2kln53kl435nl2k34nkn3k2k4k12ne 13p14po2j5v3g4c5gg1mskdjpsaljbdg9e25980"

const prsr = new URLSearchParams(url)

/* 

  NOTE:  i told you. no-op forwarding doesnt work with objects of any signature. it only works with native js objs.
  further refs for detailed explaination on the solution : 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#no_private_property_forwarding

*/

const prxy = new Proxy(prsr, {
    get (targt, prop) {
        return targt.get(prop)
    }
})

console.log(prxy.secret)