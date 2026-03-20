# 设计指南 - 晴宝咱吃啥

## 品牌定位

**应用名称**: 晴宝咱吃啥
**应用定位**: 基于AI的厨房助手，帮助用户自动规划菜谱、生成购物清单、提供备菜和做菜指南
**设计风格**: 温暖、简洁、高效
**目标用户**: 家庭主妇/主夫、厨房新手、忙碌的上班族

## 配色方案

### 主色板
- **主色**: 低饱和度蓝绿色 `#0d9488` → `bg-teal-600` / `text-teal-600`
  - 寓意：清新、自然、健康
- **辅色**: 柔和暖绿 `#86efac` → `bg-green-300` / `text-green-600`
  - 寓意：舒适、温馨、活力

### 中性色
- **背景色**:
  - 页面背景: `#f8fafc` → `bg-slate-50`
  - 卡片背景: `#ffffff` → `bg-white`
- **文字色**:
  - 主标题: `#1e293b` → `text-slate-800`
  - 正文: `#64748b` → `text-slate-600`
  - 辅助文字: `#94a3b8` → `text-slate-400`

### 语义色
- **成功**: `#22c55e` → `bg-green-500`
- **警告**: `#f59e0b` → `bg-amber-500`
- **错误**: `#ef4444` → `bg-red-500`
- **信息**: `#3b82f6` → `bg-blue-500`

## 字体规范

### 字体层级
- **H1 - 页面标题**: `text-2xl font-bold text-slate-800`
- **H2 - 区块标题**: `text-xl font-semibold text-slate-800`
- **H3 - 卡片标题**: `text-lg font-semibold text-slate-800`
- **Body - 正文**: `text-base text-slate-600`
- **Caption - 说明**: `text-sm text-slate-400`

## 间距系统

### 页面边距
- 水平边距: `px-4` (16px)
- 垂直边距: `py-4` (16px)

### 组件间距
- 大区块间距: `gap-6` (24px)
- 小区块间距: `gap-4` (16px)
- 列表项间距: `gap-3` (12px)

### 卡片内边距
- 标准卡片: `p-4` (16px)
- 小卡片: `p-3` (12px)

## 组件规范

### 按钮 (Button)
**优先使用 `@/components/ui/button`**

```tsx
import { Button } from '@/components/ui/button'

// 主按钮 - 蓝绿色
<Button className="bg-teal-600 text-white hover:bg-teal-700">
  开始规划
</Button>

// 次按钮 - 白色带蓝绿色边框
<Button className="bg-white text-teal-600 border-2 border-teal-600">
  重新规划
</Button>

// 禁用态
<Button disabled className="bg-slate-300 text-slate-500">
  规划中...
</Button>
```

### 卡片 (Card)
**优先使用 `@/components/ui/card`**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// 菜谱卡片
<Card className="bg-white shadow-sm rounded-xl">
  <CardHeader className="pb-3">
    <CardTitle className="text-lg font-semibold text-slate-800">
      菜品名称
    </CardTitle>
  </CardHeader>
  <CardContent>
    <View className="text-sm text-slate-600">菜品描述</View>
  </CardContent>
</Card>

// 购物清单卡片
<Card className="bg-green-50 border border-green-200 rounded-xl">
  <CardContent className="p-4">
    <View className="text-sm text-green-700">食材列表</View>
  </CardContent>
</Card>
```

### 输入框 (Input)
**优先使用 `@/components/ui/input`**

```tsx
import { View } from '@tarojs/components'
import { Input } from '@/components/ui/input'

// 必须用 View 包裹，H5 端 Input 是 inline 元素
<View className="bg-slate-50 rounded-xl px-4 py-3">
  <Input
    className="w-full bg-transparent text-slate-800"
    placeholder="请输入内容"
  />
</View>
```

### 选择器 (Select/Radio)
**优先使用 `@/components/ui/select` 或 `@/components/ui/radio-group`**

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// 人数选择
<Select>
  <SelectTrigger className="bg-slate-50 rounded-xl">
    <SelectValue placeholder="选择人数" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">1人</SelectItem>
    <SelectItem value="2">2人</SelectItem>
    <SelectItem value="3">3人</SelectItem>
    <SelectItem value="4">4人</SelectItem>
    <SelectItem value="5">5人以上</SelectItem>
  </SelectContent>
</Select>
```

### 标签 (Badge)
**优先使用 `@/components/ui/badge`**

```tsx
import { Badge } from '@/components/ui/badge'

// 时间段标签
<Badge className="bg-teal-100 text-teal-700 px-3 py-1">
  晚餐
</Badge>

// 难度标签
<Badge className="bg-green-100 text-green-700 px-3 py-1">
  简单
</Badge>
```

### 对话框 (Dialog)
**优先使用 `@/components/ui/dialog`**

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="bg-white rounded-2xl p-6">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold text-slate-800">
        备菜指南
      </DialogTitle>
    </DialogHeader>
    <View className="text-base text-slate-600 mt-4">
      备菜步骤内容
    </View>
  </DialogContent>
</Dialog>
```

## 导航结构

### 页面结构
- **单页应用**: 所有功能在 `pages/index/index` 中实现
- **TabBar**: 不需要（单页面应用）

### 页面布局
```
┌─────────────────────────────────┐
│  顶部标题栏 (固定)               │
├─────────────────────────────────┤
│  - 选择用餐人数                 │
│  - 选择用餐时间段               │
│  - 开始规划按钮                 │
├─────────────────────────────────┤
│  菜谱展示区域 (滚动)            │
│  - 菜品卡片列表                 │
│  - 购物清单卡片                 │
│  - 备菜指南                     │
│  - 做菜步骤                     │
└─────────────────────────────────┘
```

## 空状态与加载态

### 空状态
```tsx
<View className="flex flex-col items-center justify-center py-12">
  <View className="text-slate-300 mb-4">
    <ChefHat size={64} />
  </View>
  <View className="block text-lg font-semibold text-slate-400 mb-2">
    还没有菜谱
  </View>
  <View className="block text-sm text-slate-300 text-center">
    选择人数和时间段，开始规划菜谱
  </View>
</View>
```

### 加载态
```tsx
<View className="flex items-center justify-center py-12">
  <View className="text-teal-600">
    <LoaderCircle className="animate-spin" size={48} />
  </View>
  <View className="block text-base text-slate-600 ml-3">
    正在智能规划中...
  </View>
</View>
```

## 小程序约束

### 包体积限制
- 主包体积 ≤ 2MB
- 使用 CDN 加载图片资源
- 避免引入大型第三方库

### 图片策略
- 菜品图片: 使用 CDN 或对象存储
- 图标: 使用 lucide-react-taro
- 避免使用 base64 图片

### 性能优化
- 使用虚拟列表处理长列表
- 图片懒加载 `lazyLoad`
- 合理使用 `useMemo` 和 `useCallback`

## 图标使用

**必须使用 `lucide-react-taro`**

```tsx
import { Users, Clock, ShoppingCart, ChefHat, Flame, Check } from 'lucide-react-taro'

// 所有图标必须设置 size 和 color
<Users size={24} color="#0d9488" />
<Clock size={20} color="#64748b" />
<ShoppingCart size={20} color="#22c55e" />
<ChefHat size={48} color="#94a3b8" />
<Flame size={16} color="#0d9488" />
<Check size={20} color="#22c55e" />
```
