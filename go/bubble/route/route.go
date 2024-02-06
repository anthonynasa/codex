package route

import (
	"bubble/handler"
	"github.com/gin-gonic/gin"
)

func SetupRoute() *gin.Engine {
	// 创建gin引擎
	r := gin.Default()
	// 映射static目录
	r.Static("/static", "./web/static")
	r.StaticFile("/favicon", "./web/favicon.ico")

	// 加载html文件
	r.LoadHTMLGlob("./web/*.html")

	// 绑定路由

	// index
	r.GET("/index", handler.IndexHandler)

	// v1组
	v1 := r.Group("/v1")
	{
		//  创建任务
		v1.POST("/todo", handler.CreateTask)
		// 查询所有任务
		v1.GET("/todo", handler.GetTaskList)
		// 查询单个任务
		v1.GET("/todo/:id", handler.GetTask)
		// 修改指定任务
		v1.PUT("/todo/:id", handler.UpdateTask)
		// 删除指定任务
		v1.DELETE("/todo/:id", handler.DeleteTask)
	}

	return r
}
