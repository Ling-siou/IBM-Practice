// Initialize Firebase
var config = {
  apiKey: "AIzaSyDFmsxrwMRcTrhXFI_4VhGlqHYFll-h8BE",
  authDomain: "practicing-lhliao-18-0723.firebaseapp.com",
  databaseURL: "https://practicing-lhliao-18-0723.firebaseio.com",
  projectId: "practicing-lhliao-18-0723",
  storageBucket: "practicing-lhliao-18-0723.appspot.com",
  messagingSenderId: "275078980074"
};

firebase.initializeApp(config); 

var Record = firebase.database().ref('homeWork-BMI-(ByLiao)')
// var data = {}

var heighCm = document.getElementById('height')
var weightKg = document.getElementById('weight')
var list = document.getElementById('list')
var send = document.getElementById('yellow-btn')
var redo = document.getElementById('redo-btn')
var resultInBtn = document.getElementById('report-in-btn')
var resultInHeader = document.getElementById('result-in-header')
var recordTime = (new Date).getFullYear() + "-" + ((new Date).getMonth()+1) + "-"+ (new Date).getDate()

var outerThis = this
var colorOfLine = ''
var BMILav = ''

Record.once('value', function(snapshot){
  var data = snapshot.val()
  snapshot.forEach(element => {
    let item = element.val()
    let addLi = document.createElement("li")
    let newItem = "<div class="+ item.class +"></div><div><p><span>"+ item.BMILav +"</span></p><p>BMI<span>"+ item.bmiNum +"</span></p><p>weight<span>"+ item.kg +"kg</span></p><p>heigh<span>"+ item.cm + "cm</span></p><p>"+ item.date + "</p></div>"
    addLi.innerHTML = newItem
    list.insertBefore(addLi,list.childNodes[0])
  });
})

redo.addEventListener('click', function(){
  resultInBtn.textContent = '看結果'
  resultInHeader.textContent = ''
  outerThis.resultToggle()
  heighCm.value = ''
  weightKg.value = ''
  event.stopPropagation()
})

send.addEventListener('click', function(e){
  var typeOfHeigh = parseFloat(heighCm.value).toString();
  var typeOfWeight = parseFloat(weightKg.value).toString();

  if(typeOfHeigh == 'NaN' || typeOfWeight == 'NaN'){
    alert('欄位都要輸入數字喔')
  }else if(send.classList.contains('sended')){
    return
  }else{
    outerThis.showRecord()
  }
})

var showRecord = function(){
  var bmiNum = Math.round(weightKg.value/((heighCm.value/ 100)*(heighCm.value/ 100))*10) / 10

  if(bmiNum < 18.5){
    colorOfLine = 'green-line'
    BMILav = '過輕'
  }else if(bmiNum >= 18.5 && bmiNum < 24){
    colorOfLine = 'blue-line'
    BMILav = '正常'
  }else if(bmiNum >= 24 && bmiNum < 27){
    colorOfLine = 'orange-line'
    BMILav = '過重'
  }else if(bmiNum >= 27 && bmiNum < 30){
    colorOfLine = 'orange-line'
    BMILav = '輕度肥胖'
  }else if(bmiNum >= 30 && bmiNum < 35){
    colorOfLine = 'fat-orange-line'
    BMILav = '中度肥胖'
  }else if(bmiNum >= 35){
    colorOfLine = 'red-line'
    BMILav = '重度肥胖'
  }

  Record.push({'BMILav': BMILav, 'bmiNum': bmiNum, 'cm': heighCm.value, 'kg': weightKg.value, 'date': recordTime, 'class': colorOfLine})

  let addLi = document.createElement("li")
  let newItem = "<div class="+ colorOfLine +"></div><div><p><span>"+ BMILav +"</span></p><p>BMI<span>"+ bmiNum +"</span></p><p>weight<span>"+ weightKg.value +"kg</span></p><p>heigh<span>"+ heighCm.value + "cm</span></p><p>"+ recordTime + "</p></div>"
  addLi.innerHTML = newItem
  list.insertBefore(addLi,list.childNodes[0])
  
  resultInBtn.innerHTML = bmiNum + '<br><span>BMI</span>'
  resultInHeader.textContent = BMILav
  outerThis.resultToggle()
}

var resultToggle = function(){
  send.classList.toggle('sended')
  send.classList.toggle(colorOfLine)
  resultInBtn.classList.toggle('pushed')
  resultInHeader.classList.toggle(colorOfLine)
}