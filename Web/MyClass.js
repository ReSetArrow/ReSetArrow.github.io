class People {
    #Name;/* # 符號代表private */
    #Email;
    /* 建構子 */
    constructor(name, tel, addr, email) {
        this.#Name = name;
        this.Tel = tel;
        this.Address = addr;
        this.#Email = email;
    }

    /* 屬性封裝 */
    get Email() {
        return this.#Email;
    }

    getName() {
        return this.#Name;
    }

    setName(name) {
        if (name != "")
            this.#Name = name;
    }

    /* 透過方法取email的值 */
    getEmail() {
        return this.#Email;
    }

    getInfo() {
        return this.#Name + "-" + this.Tel + "-" + this.Address + "-" + this.#Email;
    }
}

class Male extends People {
    constructor(name, tel, addr, email, photo) {
        super(name, tel, addr, email);
        this.Photo = photo;
    }

    getGender() {
        return "男生"
    }
}
class Female extends People {
    constructor(name, tel, addr, email) {
        super(name, tel, addr, email);
    }

    getGender() {
        return "女生"
    }
    forFemaleMethod() {
        return "這是專屬女生的方法"
    }
}