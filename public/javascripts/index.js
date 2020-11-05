window.addEventListener("DOMContentLoaded", e => {
    document.querySelector(".search").addEventListener("keydown", e => {
        if(e.keyCode === 13) e.target.submit();
    })
});
