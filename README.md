# poems(诗集网站)
### 如何安装本web站点？
***

git clone https://github.com/liubiao0810/poems.git

1.进入down好的站点目录，运行 npm install 安装模块依赖；

2.待模块依赖好后，需要另外依赖mongodb;

3.下载好mongodb后，进入mongodb目录新建data/db目录，以后都用此目录存放数据；

4.命令行进入mongodb的bin目录，运行：例如：./mongod --dbpath /Users/liubiao/mongodb/data/db；

5.单开一个命令行标签，进入web站点目录，运行supervisor app.js,可以看到提示：
>Starting child process with 'node app.js'
启动成功，端口为3000
主页地址：http://localhost:3000/

那么启动就成功了。

![poems](http://www.onlove.cc/images/E6305F5A-1C6B-460D-807E-64CE68A902BD.png)