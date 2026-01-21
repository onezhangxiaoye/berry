
## 包安装

#### packages 下的包依赖下面的其他包

```
比如在 hermes-request 中依赖了 request 包，安装命令需要在根目录下执行

pnpm add @berry/request@workspace:* --filter hermes-request
```

```
比如在 react-test 中依赖了 hermes-request 包，安装命令需要在 react-test 目录下执行

pnpm add @berry/hermes-request@workspace:*
```