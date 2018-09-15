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
	/*  登录提示  */
	var pageText = $('table table table:last tr:last').text();
	if(pageText=="登录后可以查看详细信息"){
		alert('你没有登录');
		return ;
	}
	//console.log('1111');
	//console.log(c.adaytime);
	
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
		
		obj.size = parseInt($(this).find('td:eq(9)').text());
		obj.students = parseInt($(this).find('td:eq(10)').text());
		obj.btn = $(this).find('td:eq(12)');
		course.push(obj);
	});
	
	var count = 0;
	
	for(var i=0;i<course.length;i++){
		var courseWeek = parseInt(course[i].week.match(/\d+/)[0]);
		//周数不符
		if(courseWeek < configlist.startWeek || courseWeek > configlist.endWeek) {
			count++;
			continue;
		}
		//星期&时间不符
		if(configlist.adaytime.indexOf(course[i].day+' '+course[i].time)==-1){
			count++;
			continue;
		}
		//课程无法选择
		if(course[i].btn.find(':submit').is(':disabled') || course[i].btn.find(':submit').val()!='预 约'
			|| course[i].btn.text().trim()=="已达选课上限"){
			count++;
			continue;
		}
		
		
		var form = course[i].btn.parent('tr').prev('form');
		(function(i){
		$.post(form.attr('action'),"submit_type=book_submit",function(data){
			//console.log(data);
			if(data.indexOf('预约成功')!=-1){
				if(localStorage['version']=='dev'){
					$.get('http://127.0.0.1/epc/?log='+course[i].week+'%20'+course[i].day+'%20'+course[i].time+'%20'+course[i].name);
				}
			}
			count++;
			if(count==course.length){
				$(document).trigger('next');
			}
			
		});
		})(i);
		
	}
	if(count==course.length){
		$(document).trigger('next');
	}
	console.log(course);
}

$(document).bind('next',function(){
	var T = 5000;
	url = 'http://epc.ustc.edu.cn/' + $('a[title="上一页"]').attr('href').trim();
	//console.log('333');
	setTimeout(function(){
		//console.log('222');
		location.href=url;
	},T);
	
});


main();