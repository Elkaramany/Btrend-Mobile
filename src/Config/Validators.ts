export const validateName = (name: string): boolean => {
    if (!name || name.length < 2) return false;
    return true;
}

export const validateEmail = (email: string): boolean => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return false;
    }
    return true;
}

export const validatePassword = (password: string): boolean => {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password || !password.length || !password.match(passw)) {
        return false
    }
    return true
}

export const validatePhone = (phone: string) => {
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (regex.test(phone)) return true
    return false
}

export const formatDate = (date: Date) => {
    return date.toString().substring(0, date.toString().length - 18)
}

export const selectItem = (item: string, arr: string[]) => {
    //Item already selected so remove it
    if (itemSelected(item, arr)) {
        let newArr = [...arr]
        newArr = newArr.filter(i => i !== item);
        return newArr
    } else {
        //Only have 5 catefories max
        if (arr.length <= 4) {
            const newArr = [...arr]
            newArr.push(item)
            return newArr
        }else{
            return arr
        }
    }
}

export const itemSelected = (cat: string, arr: string[]) => {
    if (arr && arr.length && arr.includes(cat)) return true
    return false
}
