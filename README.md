# USTC-EPC 刷课插件  
间隔一段时间刷新epc选课界面，自动预约指定时间的课

### 简介
项目参考了学长开发的项目（https://github.com/tracholar/ustc-epc-chrome-extension） ，现在（2018.9）距离学长开发这个项目的时间已经过去了四年，网页逻辑及登录方式已经进行了一些改版。因此，我对学长的项目进行了重新开发，简单的介绍一下我的插件的工作方式：

1.首先项目被封装成chrome插件的形式（可以应用在某些使用chromium内核的国产浏览器上），仅在epc的主页会被触发，不会影响到大家浏览其他网页。  
2.在epc的界面下，页面下方（需鼠标滚轮往下滚一下）会有一个配置（config）界面，选择你希望预约的课程及时间，填写你希望预约的周数，不要忘了点击SAVE。  
3.随后进入你预约课程的界面（意思是，如果你要选Topical Discussion，请从左侧面板进入Oral Practice Platform-->Topical Discussion），这时插件会自动识别到该界面，开始检索课程并自动刷新。必须指出的是，插件目前并不会自动遍历全部的页面，仅仅只会刷新第一页，因此是一个捡漏的功能（即使这样，在Drama这样课少的界面依然可以用来抢课），不过如果我自己的需求强烈，遍历全部界面以实现在预约的第一时间抢课的功能会很快实现，因为实现起来并不难。  
4.当然目前的插件仅仅能对当前你打开的页面操作，如果你想预约两类或更多类课程，请再打开一个epc选课页面。  

这个插件基本上是开源开放使用了，我会将更新日志及todolist放在readme界面，以便大家参考我的开发动态，如果有问题或者开发建议，可以在issue界面向我提出，或者发送email给我（yixiangw@foxmail.com)，另外同名的mail.ustc邮箱也在使用但是看的没有这个邮箱这么勤。

## todolist
1.在右上角图标上实现操作开关，方便大家开关插件  
2.刷新频率自定义（虽然很好实现，但似乎没啥用）  
3.遍历全部可选页面  
4.对预约时间抢课进行一些优化  
5.config页面考虑对排版进行优化，比如按星期几竖向排列之类的  
6.开放全部的课程类型，主要是debate之前懒得做了，也不太想选这门课  

#### todolist是一个好东西，但是我有时候会太懒，就会拖。。。

## 版本日志

### 0.1.0
1.这是初代版本，参考了学长zuoyuan的项目，实现了我需求的最基本功能。  
2.与学长的项目类似，插件分为两个主要js脚本，分别做配置功能和预约选课功能。  
3.config页面尽量做的简单易用，相比学长的项目删去了一些无用的配置信息。  
4.预约选课功能简单写了一下，面向的主要需求是捡漏，不过对后续开发应该还算友好，反正就算项目里有shit也多半是我自己吃，大不了就重构嘛。  
5.系统写了一下文档，以后可能不会这么勤快了。