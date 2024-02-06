package handler

import (
	"bubble/conf"
	"bubble/dal/model"
	"bubble/dal/query"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

// IndexHandler
//
//	@Description: 主页
//	@param c
func IndexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

// CreateTask
//
//	@Description: 创建任务
//	@param c
func CreateTask(c *gin.Context) {
	var todo model.Todo
	t := query.Todo
	c.ShouldBind(&todo)
	err := t.Create(&todo)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"err": err.Error()})
	}
	c.JSON(http.StatusOK, todo)
}

// GetTaskList
//
//	@Description: 查询所有任务
func GetTaskList(c *gin.Context) {
	t := query.Todo
	todos, err := t.Find()
	if err != nil {
		return
	}
	c.JSON(http.StatusOK, todos)

}

// GetTask
//
//	@Description: 查询指定任务
//	@param c
func GetTask(c *gin.Context) {
	/*
		// 使用gen dao query
		id, err := strconv.ParseInt(c.Param("id"), 10, 64)
		if err != nil {
			return
		}
		t := query.Todo
		t.ID.Eq(id)
		c.JSON(http.StatusOK, t)


	*/

	// 使用gorm
	id := c.Param("id")
	var t model.Todo
	conf.DB.Where("id= ?", id).First(&t)
	fmt.Println("hahahah")
	c.JSON(http.StatusOK, t)
}

// UpdateTask
//
//	@Description: 更新前端传过来的任务
//	@param c
func UpdateTask(c *gin.Context) {
	id := c.Param("id")
	// 查询数据库中是否存在
	var t model.Todo
	if err := conf.DB.Where("id= ?", id).First(&t).Error; err != nil {
		c.JSON(http.StatusOK, gin.H{"err": err.Error()})
		return
	}
	// 绑定前端传来的数据,前端对status做了更新与判断
	// 将`JSON` 数据绑定到`结构体`中
	c.ShouldBind(&t)
	fmt.Printf("%+v%", t)
	if err := conf.DB.Debug().Save(&t).Error; err != nil {
		c.JSON(http.StatusOK, gin.H{"err": err.Error()})
	} else {
		c.JSON(http.StatusOK, t)
	}

}

// DeleteTask
//
//	@Description: 删除指定任务
//	@param c
func DeleteTask(c *gin.Context) {
	id := c.Param("id")
	if err := conf.DB.Where("id= ?", id).Delete(model.Todo{}).Error; err != nil {
		c.JSON(http.StatusOK, gin.H{"err": err.Error()})
	}
	c.JSON(http.StatusOK, gin.H{id: "deleted"})
}
