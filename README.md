# @cicctencent/figma2html
工具类

```bash
npm i @cicctencent/figma2html
```

`需要手动拼上文件id和token: https://fefeding.github.io/figma2html/example/index.html?fileid=&token=`
[example](https://fefeding.github.io/figma2html/example/index.html)

# 使用
### 引用
```js
import { convert, nodeToDom, loadFigmaFile, getFigmaImage, getFigmaFileImages } from "@cicctencent/figma2html";
```

### 获取figma信息（这块请自行调用api获取，这里只给示例）
```js
// 用文件ID，和个人token拉取数据
data = await loadFigmaFile(fileKey, token);
```

```js
// 获取当前文件所有图片
images = await getFigmaFileImages(fileKey, token);
```
### 转换格式到自定义格式
```js
// 转换模板，并动态获取图片地址
const tpl = await convert(data, null, {
    images,
    async getImage(key) {
        console.log('get image', key);
        if(images[key]) return images[key];
        return '';// 待实现动态获取图片地址
    }
});
```
```js
// 把自定义格式转为document元素结构
const node = await nodeToDom(tpl, {});

node && document.body.appendChild(node);
```
# API
[API](docs/api/index.md)
