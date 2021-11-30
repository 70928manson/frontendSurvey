axios.get('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json?token=AAQWFQDSNRRXC6FBW7PDSETBOESVW').then(function(response){
  let data = response.data;
  takeCaseSalary(data);
  Gaming_e_commerce(data);
  genderRation(data)
  salaryDistributed(data);
});

function takeCaseSalary(data){
  //抓出產業為接案公司的資料
  const caseIndustryData = data.filter(function (item){
    if(item.company.industry == '接案公司'){
      return item;
    }
  })
  // console.log(caseIndustryData);
  //抓出每個人對接案公司的薪資滿意度抓出來
  const caseIndustrySalaryScore = caseIndustryData.map(function (item){
    return item.company.salary_score;
  })
  // console.log(caseIndustrySalaryScore);
  //將每個人薪資滿意度組合再一起
   let newData = {};
  caseIndustrySalaryScore.forEach(function (item){
    if(newData[item] == undefined){
      newData[item] = 1;
    }else{
      newData[item]+=1;
    }
  })
  //將newData資料組成c3.js長條圖格式
  let barData = [];
  let barBegin = Object.keys(newData);
  barBegin.forEach(function(item){
    barData.push([item, newData[item]]);
  })
  
  const caseSalaryChart = c3.generate({
    bindto: "#caseSalaryChart",
    data: {
      columns: barData,
      type: "bar"
    }
  });
};

//產業滿意度
function Gaming_e_commerce(data){
  let charData = [];
  
  let gamingNum = 0;
  let gamingScore = 0;
  
  const gaminData = data.forEach(function (item){
    if(item.company.industry == '博奕'){
      gamingNum++;
      gamingScore += parseInt(item.company.score);
    }
  })
  charData.push(['博奕', (gamingScore/gamingNum).toFixed(2)]);
  
  let eCommerceNum = 0;
  let eCommerceScore = 0;
  
  const eCommerceData = data.forEach(function(item){
    if(item.company.industry == '電子商務'){
      eCommerceNum++;
      eCommerceScore += parseInt(item.company.score);
    }
  })
  charData.push(['電子商務', (eCommerceScore/eCommerceNum).toFixed(2)]);   

  
  const Gaming_eCommerceIndustryChart = c3.generate({
    bindto: "#Gaming_eCommerceIndustryChart",
    data: {
      columns: charData,
      type: "bar"
    },
     bar: {
        width: {
            ratio: 0.1 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }
  });
};

function genderRation(data){
  let male = 0;
  let women = 0;
  const genderRation = data.forEach(function(item){
    if(item.gender == "男性"){
      male++;
    }else if(item.gender == "女性"){
      women++;
    }
  })
  
  let genderData = [];
  genderData.push(["男性" ,male]);
  genderData.push(["女性", women]);
  
  // console.log(genderData);
  const genderChart = c3.generate({
    bindto: "#genderChart",
    data: {
        // iris data from R
        columns: genderData,
        type : 'pie',
        // onclick: function (d, i) { console.log("onclick", d, i); },
        // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
});
}

function salaryDistributed(data){
  let salaryData = {};
  
  data.forEach(function (item){
    if(salaryData[item.company.salary] == undefined){
      salaryData[item.company.salary] = 1;
    }else{
      salaryData[item.company.salary]++;
    }
  })
  
  let salaryCharData = [];
  const aaa = Object.keys(salaryData)
  aaa.forEach(function(item){
    salaryCharData.push([item, salaryData[item]])
  })
  console.log(salaryCharData)
  
  const salaryDistributed = c3.generate({
    bindto: "#salaryDistributed",
    data: {
        // iris data from R
        columns: salaryCharData,
        type : 'pie',

        // onclick: function (d, i) { console.log("onclick", d, i); },
        // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
});
  
  
}

