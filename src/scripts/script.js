class addJs{
    constructor(){
        this.header = document.querySelector('header')
        this._init()
    }
    _init(){
        alert('Ya funciona el js')
    }
}
window.addEventListener("load", new addJs());