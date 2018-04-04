var users,
  flag = 1,
  submit = document.getElementById('submit');
submit.addEventListener('click', validate);
drawTable();

function validate() {
  flag = 1;
  var a = document.getElementsByClassName('errstr');
  while (a.length) {
    a[0].remove();
  }
  // console.log(a)
  // for (var i = 0; i < a.length; i++) {
  //   console.log(a[i])
  //   a[i].remove()
  // }
  var fname = document.getElementById('fName');
  var lname = document.getElementById('lName');
  var mail = document.getElementById('mail');
  var male = document.getElementById('male');
  var female = document.getElementById('female');
  check(fname);
  check(lname);
  if (male.checked == false && female.checked == false) {
    flag = 0;
    document.getElementById("fe").insertAdjacentHTML('afterend', '<span  class = "errstr" style="color : red;">*Invalid input</span>');
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    flag = 0;
    mail.insertAdjacentHTML('afterend', '<span class = "errstr"  style="color : red;">*Invalid input</span>');
  }
  if (flag == 1) {
    var gen = male.checked == true ? "male" : "female";
    var b = {
      firstName: fname.value,
      lastName: lname.value,
      gender: gen,
      email: mail.value
    };
    users = JSON.parse(localStorage.getItem('data'));
    if (users == null) {
      users = [b];
    } else {
      users.push(b);
    }
    localStorage.setItem('data', JSON.stringify(users));
    drawTable();
  }
}

function check(field) {
  if (field.value != null && field.value != "") {
    if (parseInt(field.value)) {
      flag = 0;
      field.insertAdjacentHTML('afterend', '<span class = "errstr"  style="color : red;">*Invalid input</span>');
    }
  } else {
    flag = 0;
    field.insertAdjacentHTML('afterend', '<span class = "errstr"  style="color : red;">*Invalid input</span>');
  }
}

function drawTable() {
  users = JSON.parse(localStorage.getItem('data'));
  var tab = document.getElementById('tab');
  if (users) {
    if (tab) {
      tab.remove();
    }
    submit.insertAdjacentHTML("afterend", "<table id='tab' border=1><tr><th>firstName</th><th>lastName</th><th>gender</th><th>email</th></tr></table>");
    var len = users.length;
    for (var i = 0; i < len; i++) {
      var obj = users[i];
      tab = document.getElementById('tab');
      tab.insertAdjacentHTML("beforeend", "<tr><td>" + obj.firstName + "</td><td>" + obj.lastName + "</td><td>" + obj.gender + "</td><td>" + obj.email + "</td></tr>");
    }
  }
}