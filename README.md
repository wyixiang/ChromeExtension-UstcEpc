# USTC-EPC 刷课插件  
间隔一段时间刷新epc选课界面，自动预约指定时间的课

### 简介
项目参考了学长开发的项目（https://github.com/tracholar/ustc-epc-chrome-extension ），现在（2018.9）距离学长开发这个项目的时间已经过去了四年，网页逻辑及登录方式已经进行了一些改版。因此，我对学长的项目进行了重新开发。

如果你发现了这个项目，欢迎使用，但是请不要继续传播。  
一个是如果使用的人多了会直接影响科技的抢课效率。  
另一个，也是最主要的是我确实还是很担心被查水表的。  
如果有问题可以直接在issue里向我提出。  

## todolist
1.在右上角图标上实现操作开关，方便开关插件  
2.刷新频率自定义（虽然很好实现，但似乎没啥用）  
3.遍历全部可选页面  
4.对预约时间抢课进行一些优化  
5.config页面考虑对排版进行优化，比如按星期几竖向排列之类的  
~~6.开放全部的课程类型，主要是Debate之前懒得做了，也不太想选这门课~~  
7.选上课之后发邮件提醒  
8.界面UI直男审美

## 已知bug
#### （不影响使用）
~~1.在Oral Practice Platform界面就会触发一些网页跳转，出现报错~~  
2.不定时产生网页获取404  
~~3.因为戏剧时间与讨论时间的晚间时间段相同，会自动触发复选框~~  
4.未知登出问题，在想办法  

## 版本日志

### 0.2.1  
1.改变了reload方式，提升了执行稳定性  
2.增加选课成功后的alert弹窗提示  

### 0.2.0
1.修复在Oral Practice Platform界面就会触发网页跳转报错的问题  
2.修复因戏剧时间与讨论时间的晚间时间段相同自动触发复选框的问题  
3.开放全部的课程类型，加入了Debate  

### 0.1.1
1.优化了代码组织，提升了执行稳定性  
2.增加了达到选课上限后自动停止发送请求的功能  
3.优化了刷新请求发送频率，在不活跃时间段请求发送减少一半，增加了脚本安全性  

### 0.1.0
1.这是初代版本，参考了学长zuoyuan的项目，实现了我需求的最基本功能。  
2.与学长的项目类似，插件分为两个主要js脚本，分别做配置功能和预约选课功能。  
3.config页面尽量做的简单易用，相比学长的项目删去了一些无用的配置信息。  
4.预约选课功能简单写了一下，面向的主要需求是捡漏，不过对后续开发应该还算友好，反正就算项目里有shit也多半是我自己吃，大不了就重构嘛。  
5.系统写了一下文档，以后可能不会这么勤快了。