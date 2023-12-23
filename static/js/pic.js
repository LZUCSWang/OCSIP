// Get the image elements
var imgs = document.querySelectorAll('img');
console.log(imgs);

imgs.forEach(function (item) {
    item.addEventListener('click', function () {
        var id = item.getAttribute('data_id');
        var info = myDict[id];
        var labelPickerItemsHead = document.querySelector('.label-picker_items_head');
        labelPickerItemsHead.innerHTML = '';
        var labelTitle = document.querySelector('.label-title');
        labelTitle.textContent = '图片信息'
        var labelPickerItemsContent = document.querySelector('.label-picker_items_content');
        labelPickerItemsContent.innerHTML = '';
        html2 = generateHTML2(info)
        labelPickerItemsContent.innerHTML = html2;
    });
});
