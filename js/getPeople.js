
function getPeople(xhr) {
    var container = document.getElementById('container');
    container.innerHTML = '';
    var people = JSON.parse(xhr.responseText);
    for (var i = 0; i < people.length; i++) {
        var person = document.createElement('div');
        person.className = 'person';
        person.style.backgroundImage = "url(\"images/"+people[i].photo+".jpg\")";
        person.innerHTML = '<div>' + people[i].name + '</div>';
        container.appendChild(person);
        //### event listener ###
        document.querySelector('.person:last-child').addEventListener('click', function() {
            var number = parseInt(this.style.backgroundImage.match(/\d+/)) - 1;
            //### check cache/time ###
            var saveRequest = window.sessionStorage.getItem('saveRequest' + number);
            var setTime = window.sessionStorage.getItem('setTime' + number);
            if (!saveRequest && !setTime) {
                Ajax.makeRequest('POST', 'database.php', {info:number}, true, getInfo);
            } else {
                var date = new Date();
                if ((parseInt(setTime) + 30000) >= parseInt(date.getTime())) {
                    getCachedInfo(number);
                } else {
                    Ajax.makeRequest('POST', 'database.php', {info:number}, true, getInfo);
                }
            //########################
            }
        },false);
        //######################
    }
    var info = document.createElement('div');
    info.className = 'info';
    container.appendChild(info);
}

function getInfo(xhr) {
    var person = JSON.parse(xhr.responseText);
    var number = parseInt(person.photo.match(/\d+/)) - 1;
    //### set cached info + time ###
    var seq = 'saveRequest' + number;
    var time = 'setTime' + number;
    var date = new Date();
    var t = date.getTime();
    window.sessionStorage.setItem(seq, JSON.stringify(person));
    window.sessionStorage.setItem(time, t);
    //##############################
    var info = document.querySelectorAll('.person')[number].querySelector('div');
    info.style.transition = 'height 1s';
    info.style.height = '50%';
    info.innerHTML = '';
    info.innerHTML = '<div>' + person.name + '</div><div>' + person.occupation + '</div><div>' + person.birthdate.replace(/-/g, '.') + '</div><div>' + person.sex + '</div>';
    hideInfo(info);
}

function getCachedInfo(number) {
    var person = window.sessionStorage.getItem('saveRequest' + number);
    person = JSON.parse(person);
    var info = document.querySelectorAll('.person')[number].querySelector('div');
    info.style.transition = 'height 1s';
    info.style.height = '50%';
    info.innerHTML = '';
    info.innerHTML = '<div>' + person.name + '</div><div>' + person.occupation + '</div><div>' + person.birthdate.replace(/-/g, '.') + '</div><div>' + person.sex + '</div>';
    hideInfo(info);
}

function hideInfo(info) {
    setTimeout(function() {
        info.innerHTML = info.querySelector('div:first-child').textContent;
        info.style.transition = 'height 1s';
        info.style.height = '25px';
    }, 5000);
}

Ajax.makeRequest('POST', 'database.php', {}, true, getPeople);