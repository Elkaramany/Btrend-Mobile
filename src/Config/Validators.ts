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
    if (!phone || phone.length < 8) return true;
    return false;
}

export const formatDate = (date: Date) => {
    return date.toString().substring(0, date.toString().length - 18)
}