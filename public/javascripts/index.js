window.addEventListener("DOMContentLoaded", e => {
    const tbutton = document.getElementById("tbutton")
    tbutton.addEventListener("click", e => {
        const collap = document.querySelector(".collapsible")
        if(e.target){
            tbutton.classList.add("active")
        }
})

    document.querySelector(".search").addEventListener("keydown", e => {
        if (e.keyCode === 13) e.target.submit();
    })
});
