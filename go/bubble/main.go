package main

import (
	"bubble/conf"
	"bubble/dal/query"
	"bubble/route"
)

type Todo struct {
	Id int `json:"id"`
}

func main() {
	// 初始化数据库连接
	conf.InitMysql()
	// 为query设置 *gorm.DB实例
	query.SetDefault(conf.DB)
	// 配置路由
	r := route.SetupRoute()
	// 启动
	r.Run("localhost:8080")
}
