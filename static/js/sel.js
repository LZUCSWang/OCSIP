var checkboxlist = document.querySelectorAll('.s-checkbox')
checkboxlist = Array.from(checkboxlist);
checkboxlist.shift();
// console.log(checkboxlist)
function selected_change(checkbox) {
    var checkboxInput = checkbox.querySelector('.s-checkbox_input');
    var checkboxInner = checkbox.querySelector('.s-icon');
    if (checkboxInput.value == 'true') {
        checkbox.removeAttribute('class');
        checkbox.setAttribute('class', 'item s-checkbox');
        checkboxInput.value = 'false';
        checkboxInner.style.display = "none"

    } else {
        checkbox.removeAttribute('class');
        checkbox.setAttribute('class', 'img-cb s-checkbox checked');
        checkboxInput.value = 'true';
        checkboxInner.style = '';
    }
    // console.log(checkboxInput.value);
    // console.log(search_checkbox());
    // search_checkbox(); 
    return checkboxInput.value;
}
checkboxlist.forEach(function (checkbox) {
    checkbox.addEventListener('click', function () {
        selected_change(checkbox);
        search_checkbox();
    });
});