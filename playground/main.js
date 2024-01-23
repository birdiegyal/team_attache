let target = {

    data: {
        teamId: "ad23ghguj42gj342",
        memberId: "adf3424jaf35h3",
    },

    get teamId() {
        return this.data.teamId
    },

    set teamId(id) {
        console.log(`logging this: ${this} from the teamId setter.`)
        this.data.teamId = id
    }

}

let proxy = new Proxy(target, {
    get(target, property) {
        console.log(`property ${property} is trapped while accessing the ${target} object.`)
    }
})

proxy.teamId = "anotherMemberId"