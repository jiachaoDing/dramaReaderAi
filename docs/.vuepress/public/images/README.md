# 图片目录

请将 logo 和其他图片文件放在此目录中。

## favicon 要求

为了确保 favicon 在所有设备上正常显示，建议：

1. 准备多个尺寸的图标：
   - favicon.ico (16x16, 32x32)
   - logo.png (至少 192x192，用于 PWA)
   - apple-touch-icon.png (180x180，用于 iOS 设备)

2. 图片格式建议：
   - 主 favicon 使用 .ico 格式
   - 其他图标使用 PNG 格式
   - 确保图片具有透明背景
   - 文件大小控制在 100KB 以内

3. 文件命名：
   - favicon.ico
   - logo.png
   - apple-touch-icon.png

## 图片路径说明

在 VuePress 中，`docs/.vuepress/public` 目录下的文件会被复制到生成的静态网站的根目录下。

因此，放在 `docs/.vuepress/public/images/favicon.ico` 的图片，可以通过 `/images/favicon.ico` 路径访问。

## 注意事项

1. 图片文件名区分大小写
2. 确保图片格式正确
3. 图片大小适中
4. 使用标准的 favicon 尺寸
5. 提供多种尺寸以适应不同设备

请将 logo.png 和其他图片文件放在此目录中。

## 图片路径说明

在 VuePress 中，`docs/.vuepress/public` 目录下的文件会被复制到生成的静态网站的根目录下。

因此，放在 `docs/.vuepress/public/images/logo.png` 的图片，可以通过 `/images/logo.png` 路径访问。

## 注意事项

1. 图片文件名区分大小写
2. 确保图片格式正确（推荐使用 PNG 或 SVG 格式的 logo）
3. 图片大小适中，建议 logo 不超过 200KB 