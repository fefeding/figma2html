import BaseConverter from './baseNode';
/**
 * SLICE 节点转换器
 * 切片节点主要用于导出，在 HTML 中通常不需要渲染
 * 但如果需要显示，可以创建一个带边框的占位区域
 */
export class SLICEConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        // 切片节点通常不渲染，只保留位置和大小信息
        dom.style.border = '1px dashed #ccc';
        dom.style.backgroundColor = 'transparent';
        // 可以添加一个标签标识这是切片
        dom.attributes = dom.attributes || {};
        dom.attributes['data-slice'] = 'true';
        // 如果有导出设置，记录格式信息
        if (node.exportSettings && node.exportSettings.length > 0) {
            const formats = node.exportSettings.map(s => s.format).join(',');
            dom.attributes['data-export-formats'] = formats;
        }
        return super.convert(node, dom, parentNode, page, option, container);
    }
}
export default SLICEConverter;
