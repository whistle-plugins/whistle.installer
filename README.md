# whistle.installer
用于安装 Whistle 插件的插件，该插件可以在 Whistle 的 Plugins 界面上直接安装或更新指定插件，无需复制到命令行执行。

# 安装

在命令行执行以下命令（安装最新版本 Whistle 及安装 whistle.installer 插件）：

``` sh
npm i -g whistle && w2 i whistle.installer
```

 # 用法

安装插件后，打开 Whistle 的 Plugins 界面，点击顶部菜单的 `Install` 按钮弹出安装插件对话框，输入需要安装的插件 npm 包名称，选择 `--registry` 后，点击 `Install` 即可安装输入的插件：

<img width="1000" alt="intall" src="https://github.com/user-attachments/assets/b9aeb655-e184-45ca-a30f-2b4a7e9d5ad3" />

点击插件的 `Update` 按钮弹出更新插件对话框，选择 `--registry` 后，点击 `Update` 即可更新该插件。

<img width="1000" alt="Image" src="https://github.com/user-attachments/assets/4ef419b2-9543-46ee-898f-aa3a2becbac2" />

> 可以不设置 `--registry`  ，则使用系统默认的 npm registry

# 实现方式
在插件的 `package.json` 里面的 `whistleConfig` 设置 `installUrl` 指向 uiServer 里面的接口地址，且可以选择在 `installRegistry` 设置可选的 `registry`（支持数组，最多设置 3 个 registry）


# License

[MIT](./LICENSE)

