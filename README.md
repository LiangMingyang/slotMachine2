slotMachine2
============
#描述

想要看效果直接用chrome打开`http://slot.wannakissyou.com`即可（感觉不好看就多刷新几次）

2014年**软件学院**元旦晚会抽奖程序，使用webGL写的。为保证公平性，以MIT协议开源

放在github上面你可以看到我的每一次commit

#使用说明

##离线版本

release文件夹中是本地版本，进入这个文件夹即可

###0.运行

打开index.html

###1.基本操作

`空格`，`Ctrl`，`Shift`都可以操作，区别在于不同的键停止的效果不一样，按一次进入下一流程

`空格`为随机停，最后停的两位特殊处理，停的比较慢

`Shift`为从左往右停，最后两位特殊处理，停的比较慢

`Ctrl`为快速停止，所有的位停的都比较快

`D`键清除抽奖记录

`回车键`会查看当前记录的抽中的人的学号和姓名，返回的话继续按回车，U键可以去掉刚刚抽中奖的人的名字

###2.注意事项

仅可以用Chrome打开，没有在其他浏览器试验过

`F11`可以全屏

###3.问题

有问题联系本人邮箱 lmysoar@hotmail.com

##在线版本

该程序为nodejs的express工程文件，虽然和nodejs没什么关系= =，如果熟悉nodejs，那么执行命令

```
npm install
npm start
```

然后访问`http://127.0.0.1:3002`

其他的和本地版本一样，在线版本已经搭载到了我的个人网站上，欢迎访问http://slot.wannakissyou.com

#鸣谢

感谢孙导的支持和信任

感谢宋子明提供技术支持，不然3天的时间我一定搞不定，最后他没有中奖我真是挺内疚的。

感谢王春琪提供美工援助。

感谢周围同学对其提出的修改意见。

多亏了你们我这种弱渣才能写出炫酷的抽奖程序，可以为了公平，你们几乎都没中到奖= =。(不行了，累得我语无伦次了）

#License

The MIT License (MIT)

Copyright (c) 2014 Arshad Chummun

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
