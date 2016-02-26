// ! ! !
// Three Bugs

var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];
var objArray =[];


$(document).ready(function(){
   init();
   enable();
});

function init(){


    for(var i = 0; i < objArray.length; i++){

        objArray[i] = calculateSTI(objArray[i]);

    };

    for( var i = 0; i<objArray.length; i++){

        appendDom(objArray[i]);
    };



};

function enable(){
    $('.person').on('click','.delete',removeEmployee);
}

function appendDom (person){
    $('.container').append('<div class="person well col-sm-3"></div>');
    var $el = $('.container').children().last();
    $el.append('<p> Employee : '+person.name+'</p>');
    $el.append('<p> Percent of Increase :'+person.percentOfBonus+'</p>');
    $el.append('<p> Adjusted Salary :'+person.totalSalary+'</p>');
    $el.append('<p> Total Bonus Given : '+person.totalBonus+'</p>');
    $el.append('<button class="delete btn btn-danger">delete</button>');
}


function Employee (name, empId, salary, reviewScore){
this.name = name;
this.empId = empId;
this.salary = salary;
this.reviewScore = reviewScore;    
}

function buildObjects(array){
  
  for(var i = 0; i < array.length; i++){
      var name = array[i][0];
      var empId = array[i][1];
      var salary = array[i][2];
      var reviewScore = array[i][3];
      
      employee = new Employee(name,empId,salary,reviewScore);
      objArray.push(employee);
  }  
};

buildObjects(array);
console.log('showing object array', objArray);


function calculateSTI(person){
  var bonus = getBaseSTI(person.reviewScore) + getYearAdjustment(person.empId) - getIncomeAdjustment(person.salary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  person.percentOfBonus = bonus;
  person.totalSalary = Math.round(person.salary * (1.0 + bonus));
  person.totalBonus = Math.round(person.salary * bonus);

 console.log('object to be returned',person);
 return person;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent ;
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}

function removeEmployee(){
    console.log('clicked');
    $(this).parent().remove();
}