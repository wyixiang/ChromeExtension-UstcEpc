// @author       yixiangw@mail.ustc.edu.cn
// @url    https://github.com/wyixiang

//scroll to end
window.scrollTo(0,10000);
	

var Config=function(){
	this.conf = {};
	if(typeof(localStorage['adaytime'])=='undefined') localStorage['adaytime']='';
	this.conf.adaytime = localStorage['adaytime'].split(',');
	if(typeof(this.conf.adaytime)=='undefined'){
		this.conf.adaytime=[];
	}
	//console.log(this.conf.adaytime);
	
	this.conf.startWeek = typeof(localStorage['startWeek'])=='undefined'? 1:localStorage['startWeek'];
	this.conf.endWeek = typeof(localStorage['endWeek'])=='undefined'? 30:localStorage['endWeek'];
}
Config.prototype.get = function(){
	return this.conf;
}
Config.prototype.set = function(data){
	for(var i in data){
		localStorage[i] = data[i];
	}
}
var config = new Config();
var configlist = config.get();

function main(){
	/*  课程信息采集  */
	//console.dir($('table table table:first tr'));
	var pageText = $('table table table:first tr:last').text().trim();
	var pageData = pageText.split('>>')
	//console.log(pageText);
	//console.log(pageData[2]);

	/*  登录提示  */
	var loginText = $('table table table:last tr:last').text();
	if(loginText=="登录后可以查看详细信息"){
		alert('你没有登录');
		/*$.post('n_left.asp','submit_type=user_login&name=SA18011058'+'&pass=895451'+'&txt_check=&user_type=2&Submit=LOG+IN',function(data){
			console.log('Log in OK!');
			//location.reload();
			setTimeout(function(){
				location.reload();
			},10000);
		});*/
		return ;
	}

	/*  页面层数不足时返回  */
	if(pageData.length != 3){
		return ;
	}
	
	var rootTable = $('table table table table:eq(0)');
	var course = [];
	
	
	rootTable.find('tr:gt(0)').each(function(){
		var obj = {};
		obj.name = $(this).find('td:first').text();
		obj.week = $(this).find('td:eq(1)').text();
		obj.day = $(this).find('td:eq(2)').text();
		obj.teacher = $(this).find('td:eq(3)').text();
		obj.hour = $(this).find('td:eq(4)').text();
		obj.time = $(this).find('td:eq(5)').html().toString();
		obj.time = obj.time.substring(obj.time.search('>')+1);
		
		obj.btn = $(this).find('td:eq(12)');
		course.push(obj);
	});
	
	var count = 0;
	//var flag = 0;
	
	for(var i=0;i<course.length;i++){
		if(course[i].btn.text().trim()=="已达预约上限"){
			alert('已达预约上限');
			//flag = 1;
			break;
		}
		var courseWeek = parseInt(course[i].week.match(/\d+/)[0]);
		//周数不符
		if(courseWeek < configlist.startWeek || courseWeek > configlist.endWeek) {
			count++;
			continue;
		}
		//星期&时间不符
		if(configlist.adaytime.indexOf(course[i].day+' '+course[i].time+' '+pageData[2])==-1){
			count++;
			continue;
		}
		//console.log('星期&时间pass');
		//课程无法选择
		if(course[i].btn.find(':submit').is(':disabled') || course[i].btn.find(':submit').val()!='预 约'){
			count++;
			continue;
		}
		
		var form = course[i].btn.parent('tr').prev('form');
		(function(){
		$.post(form.attr('action'),"submit_type=book_submit",(function(course){
			return function(data){
				//console.log(data);
				if(data.indexOf('预约成功')!=-1){
					alert('预约成功: '+course.name+' '+course.week+course.day);
				}
			}
		})(course[i])
		);
		count++;
		})();
		
	}
	if(count==course.length){
		$(document).trigger('next');
	}
	console.log(course);
}

$(document).bind('next',function(){
	var myhour = new Date().getHours();
	var myMinute = new Date().getMinutes();
	var mySecond = new Date().getSeconds();
	console.log(myhour+":"+myMinute+":"+mySecond);
	//console.log(myhour < 1 || myhour > 7);
	var T = 5000;
	//url = 'http://epc.ustc.edu.cn/' + $('a[title="上一页"]').attr('href').trim();
	//console.log('333');

	if(myhour < 1 || myhour > 7){
		setTimeout(function(){
			//location.href=url;
			location.reload();
		},2*T);
	} else{
		setTimeout(function(){
			//location.href=url;
			location.reload();
		},4*T);
	}
	
	
});


main();