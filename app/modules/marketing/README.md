
##数据赢家 新增节点配置的流程
1、命名新增节点的名称 如：newNode

2、添加节点的大、小图标的文件

  * 小图标—需要spirit

      路径：mxGraph/images/flowIcon/toolbar_icon20x20.png

      并定义icon的class position： 如  
      css路径：marketing.css 
  
    ```CSS
	/* css 名应与节点名称一致，因为文件要读取 */
	newNode {
	  position:-100px -100px; 
	}
	```
  * 大图标的路径  

	```
	mxGraph/images/flowIcon/newNode.png
	```

3、配置节点的弹框参数  
	文件路径：controller/workFlow/nodeConfiguration.js

```js	
{
/*
* type要和节点名称一致
* 具体摆放位置，根据需求依照tree方式摆放
*/
"type":"newNode","name":"新建节点","popWidth":800
}
```

4、自定义新节点模板及控制器

	为了项目目录统一，建模板的路径应与之前的相同。如：

	html：marketing/view/node/newNode.html

	js: marketing/controller/node/newNode.js     

	备注：名称应与节点名称一致，并在html中引入js，详情可参考已有的节点。
