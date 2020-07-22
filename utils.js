function capitialize(str) {
    // return str
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    cap: capitialize
}


// 키, 값으로 exports