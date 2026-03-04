# @fefeding/figma2html

一个强大的 Figma 转 HTML 工具库，支持将 Figma 设计稿转换为高质量的 HTML/CSS 代码。

## 特性

- ✅ 支持多种 Figma 节点类型转换
- ✅ 支持丰富的样式属性（渐变、阴影、模糊等）
- ✅ 支持文本样式和字符级样式覆盖
- ✅ 支持图片处理（包含多种填充模式）
- ✅ 支持 SVG 图形转换（椭圆、多边形、星形、线条等）
- ✅ 支持蒙版效果
- ✅ 支持 Auto Layout 自动布局
- ✅ 支持 Blend Mode 混合模式
- ✅ TypeScript 类型支持

## 安装

```bash
npm install @fefeding/figma2html
```

或

```bash
yarn add @fefeding/figma2html
```

或

```bash
pnpm add @fefeding/figma2html
```

## 快速开始

### 基础使用

```typescript
import { 
    convert, 
    nodeToDom, 
    loadFigmaFile, 
    getFigmaFileImages 
} from "@fefeding/figma2html";

// 1. 获取 Figma 文件数据
const fileKey = 'your-figma-file-id';
const token = 'your-personal-access-token';
const data = await loadFigmaFile(fileKey, token);

// 2. 获取文件中的所有图片
const images = await getFigmaFileImages(fileKey, token);

// 3. 转换为 DOM 结构
const tpl = await convert(data, null, {
    images,
    async getImage(key) {
        // 返回图片 URL，可以自行处理图片加载逻辑
        if (images[key]) return images[key];
        
        // 或者动态获取图片
        // const imgData = await getFigmaImage(fileKey, token, key);
        // return imgData[key];
        return '';
    }
});

// 4. 渲染到页面
const node = await nodeToDom(tpl, {});
if (node) {
    document.body.appendChild(node);
}
```

### 获取 Figma Personal Access Token

1. 登录 [Figma](https://www.figma.com/)
2. 点击头像 -> Settings -> Personal Access Tokens
3. 点击 "Create new token" 创建新的访问令牌

## API 文档

### 主要方法

#### `loadFigmaFile(fileId: string, token: string): Promise<any>`

获取 Figma 文件数据。

```typescript
const data = await loadFigmaFile('file-id', 'your-token');
```

#### `getFigmaFileImages(fileId: string, token: string): Promise<Object>`

获取文件中所有图片的映射表。

```typescript
const images = await getFigmaFileImages('file-id', 'your-token');
// 返回格式: { [imageRef]: imageUrl }
```

#### `getFigmaImage(key: string, token: string, ids: string): Promise<Object>`

动态获取指定节点的图片。

```typescript
const images = await getFigmaImage('file-id', 'your-token', 'node-id1,node-id2');
```

#### `convert(node: Node, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>`

将 Figma 节点转换为自定义 DOM 结构。

**ConvertNodeOption 参数说明：**

```typescript
interface ConvertNodeOption {
    // 是否展开到页面级别的绝对定位
    expandToPage?: boolean;
    
    // 图片映射表
    images?: { [key: string]: string };
    
    // 动态获取图片的回调函数
    getImage?: (key: string) => Promise<string>;
}
```

**示例：**

```typescript
const domNode = await convert(figmaData, null, {
    expandToPage: true,
    images: imageMap,
    async getImage(key) {
        return imageMap[key] || '';
    }
});
```

#### `nodeToDom(node: DomNode, option?: NodeToDomOption): Promise<HTMLElement>`

将自定义 DOM 结构转换为真实的 HTML 元素。

```typescript
const htmlElement = await nodeToDom(domNode, {
    getImage: async (key) => {
        return 'https://example.com/image.jpg';
    }
});

document.body.appendChild(htmlElement);
```

## 支持的 Figma 节点类型

| 节点类型 | 支持程度 | 说明 |
|---------|---------|------|
| **DOCUMENT** | ✅ 完全支持 | 文档根节点 |
| **CANVAS** | ✅ 完全支持 | 画布/页面 |
| **FRAME** | ✅ 完全支持 | 框架容器 |
| **GROUP** | ✅ 完全支持 | 分组 |
| **TEXT** | ✅ 完全支持 | 文本（含字符级样式） |
| **RECTANGLE** | ✅ 完全支持 | 矩形 |
| **ELLIPSE** | ✅ 完全支持 | 椭圆/圆 |
| **LINE** | ✅ 完全支持 | 线条 |
| **REGULAR_POLYGON** | ✅ 完全支持 | 正多边形 |
| **STAR** | ✅ 完全支持 | 星形 |
| **VECTOR** | ✅ 完全支持 | 向量图形 |
| **BOOLEAN_OPERATION** | ⚠️ 部分支持 | 布尔运算 |
| **COMPONENT** | ⚠️ 部分支持 | 组件定义 |
| **COMPONENT_SET** | ⚠️ 部分支持 | 组件集 |
| **INSTANCE** | ⚠️ 部分支持 | 组件实例 |
| **SLICE** | ✅ 基础支持 | 切片 |

## 支持的样式属性

### 填充 (Fills)
- ✅ 纯色填充
- ✅ 线性渐变
- ✅ 径向渐变
- ✅ 角度渐变
- ✅ 菱形渐变
- ✅ 图片填充（含多种缩放模式：cover, contain, tile, stretch）

### 描边 (Strokes)
- ✅ 纯色描边
- ✅ 渐变描边
- ✅ 描边宽度
- ✅ 描边对齐方式（内/外/居中）
- ✅ 虚线描边
- ✅ 端点样式
- ✅ 连接样式

### 效果 (Effects)
- ✅ 投影阴影 (Drop Shadow)
- ✅ 内阴影 (Inner Shadow)
- ✅ 图层模糊 (Layer Blur)
- ⚠️ 背景模糊 (Background Blur) - 有限支持

### 布局
- ✅ Auto Layout 自动布局
- ✅ 布局约束 (Constraints)
- ✅ 绝对定位
- ✅ 相对定位
- ✅ 内边距 (Padding)
- ✅ 间距 (Item Spacing)

### 其他
- ✅ 透明度 (Opacity)
- ✅ 混合模式 (Blend Mode)
- ✅ 圆角 (Border Radius)
- ✅ 旋转 (Rotation)
- ✅ 蒙版 (Mask)
- ✅ 裁剪内容 (Clips Content)
- ✅ 图片滤镜（对比度、饱和度、曝光度等）

## 高级用法

### 指定名称获取特定节点

```typescript
// 转换后按名称查找节点
function findNodeByName(name: string, node: DomNode): DomNode | null {
    if (node.name === name) return node;
    if (node.children) {
        for (const child of node.children) {
            const found = findNodeByName(name, child);
            if (found) return found;
        }
    }
    return null;
}

const specificNode = findNodeByName('Button', tpl);
if (specificNode) {
    const element = await nodeToDom(specificNode, {});
    document.body.appendChild(element);
}
```

### 自定义图片处理

```typescript
const tpl = await convert(data, null, {
    async getImage(imageRef) {
        // 自定义图片处理逻辑
        // 例如：上传到 CDN、压缩、格式转换等
        const customUrl = await uploadToCDN(imageRef);
        return customUrl;
    }
});
```

### 处理组件实例

```typescript
// 组件实例会继承主组件的样式
// 可以在转换后修改特定实例
const tpl = await convert(data);
modifyComponentInstances(tpl);

function modifyComponentInstances(node: DomNode) {
    if (node.figmaData?.type === 'INSTANCE') {
        // 自定义处理组件实例
        node.style.border = '1px dashed #ccc';
    }
    if (node.children) {
        node.children.forEach(modifyComponentInstances);
    }
}
```

## 示例项目

查看 [在线示例](https://fefeding.github.io/figma2html/example/index.html)

需要在 URL 中添加你的文件 ID 和 token：
```
https://fefeding.github.io/figma2html/example/index.html?fileid=YOUR_FILE_ID&token=YOUR_TOKEN
```

## 注意事项

1. **Personal Access Token** 是敏感信息，请勿在公开代码中暴露
2. 大型 Figma 文件可能需要较长处理时间，建议异步加载
3. 部分复杂的 Figma 特性可能无法完美还原（如复杂的布尔运算、特定的混合模式等）
4. 图片需要单独获取和处理

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 生成 API 文档
pnpm api
```

## 技术栈

- TypeScript
- @fefeding/utils - 工具库
- @fefeding/css-filters - CSS 滤镜库

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.1
- 初始版本发布
- 支持基础节点类型转换
- 支持文本、图形、图片等样式处理
