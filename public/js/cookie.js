var cookie = document.getElementById('cookie')

cookie.onkeydown = function(e) {
    if (e.key == "Enter") {
        document.cookie = "key=" + cookie.value
        window.location.replace(window.location.origin);
    }
}