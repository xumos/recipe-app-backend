# Vercel 部署指南

本指南将帮助你将 NestJS 后端部署到 Vercel，实现公网访问。

## 前置条件

1. GitHub 账号（如果没有，先注册：https://github.com）
2. Vercel 账号（如果没有，先注册：https://vercel.com）

## 部署步骤

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建一个新仓库，例如 `recipe-app-backend`
3. 选择 Public 或 Private（Public 推荐，便于分享）
4. 不要勾选任何初始化选项
5. 点击 "Create repository"

### 步骤 2：推送代码到 GitHub

在你的项目根目录执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: 添加 Vercel 部署配置"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/recipe-app-backend.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 3：部署到 Vercel

1. 访问 https://vercel.com/new
2. 点击 "Continue with GitHub"
3. 授权 Vercel 访问你的 GitHub 仓库
4. 选择刚才创建的仓库 `recipe-app-backend`
5. 配置项目：
   - **Project Name**: `recipe-app-backend`（可以自定义）
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. 点击 "Deploy"
7. 等待部署完成（大约 2-3 分钟）

### 步骤 4：获取部署 URL

部署成功后，Vercel 会提供一个 URL，例如：
```
https://recipe-app-backend.vercel.app
```

### 步骤 5：配置前端使用部署 URL

修改 `.env.local` 文件：

```env
PROJECT_DOMAIN=https://recipe-app-backend.vercel.app
```

### 步骤 6：重新编译小程序

```bash
cd C:\Users\Administrator\Desktop\projects
pnpm build:weapp
```

### 步骤 7：更新小程序域名配置

在微信开发者工具中：
1. 刷新页面或重新导入 `dist-weapp` 目录
2. 点击 "开始规划菜谱" 测试
3. 在 "调试器" → "Network" 中查看请求是否发送到 `https://recipe-app-backend.vercel.app/api/recipe/plan`

## 常见问题

### Q1: 部署失败，提示 "Cannot find module 'better-sqlite3'"
A: 已在 `package.json` 中移除 `better-sqlite3` 依赖，重新部署即可。

### Q2: 部署成功，但请求失败
A: 检查以下几点：
- 前端代码是否使用了正确的 URL
- 后端接口是否正确返回数据
- 在 Vercel 控制台查看日志（Logs）

### Q3: 如何更新部署？
A: 每次推送代码到 GitHub，Vercel 会自动重新部署。

### Q4: 免费版有什么限制？
A: Vercel 免费版限制：
- 每月 100GB 带宽
- 每月 6000 分钟构建时间
- Serverless Functions 有冷启动时间
- 对于个人项目完全够用

## 下一步

1. 在微信小程序管理后台配置服务器域名：
   - 登录 https://mp.weixin.qq.com
   - 开发 → 开发管理 → 开发设置
   - 服务器域名 → request 合法域名
   - 添加：`https://recipe-app-backend.vercel.app`

2. 正式发布小程序：
   - 在微信开发者工具中点击 "上传"
   - 在小程序管理后台提交审核
   - 审核通过后发布

## 参考

- Vercel 官方文档：https://vercel.com/docs
- NestJS 部署指南：https://docs.nestjs.com/faq/serverless
